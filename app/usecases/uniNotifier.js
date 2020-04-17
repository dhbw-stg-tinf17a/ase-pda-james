const moment = require("moment"); // date manipulation library
const watsonSpeech = require("../services/watsonSpeech")(); // voice I/O handling
const speak = require("../../app/waResponses.js").uniNotifier(); // constant answers for voice assistant

const util = require("util");

module.exports = (preferences, oAuth2Client) => {
  // const prefs = require("../services/preferences.js")(db);
  const vvs = require("../services/vvs/vvs.js")();
  const maps = require("../services/gmaps.js");
  const cal = require("../services/gcalendar.js")(preferences, oAuth2Client);
  moment.locale("de");

  this.onUpdate = async function(ctx, waRes) {
    // check if WA intent corresponds
    if (waRes.generic[0].text !== "uniNotifier_welcome") {
      return new Error("Unknown intent.");
    }

    await watsonSpeech.replyWithAudio(ctx, speak.firstResponse);

    const commutePref = await preferences.get("commute");
    const validCommutePrefs = ["driving", "walking", "bicycling", "vvs"];
    if (!validCommutePrefs.includes(commutePref)) {
      return new Error("Invalid preference.");
    }

    const lectureCal = await preferences.get("lecture_cal_id");
    const nextLectures = await cal.getNextEvents(lectureCal);
    const nextLecture = nextLectures[0]; // first API response element always returns next or current lecture

    const timeParams = {
      currentTime: moment().toISOString(true),
      lectureStart: moment(nextLecture.start.dateTime),
      arrBuffer: 10,
      commuteDuration: null, // to be filled after API call
    };

    // ==== TRANSIT CASE ===============================================================================================
    if (commutePref === "vvs") {
      const origin = await preferences.get("home_stop_id");
      const destination = await preferences.get("uni_stop_id");
      let trip;

      const tripParams = {
        originId: origin,
        destinationId: destination,
        date: moment(timeParams.lectureStart.subtract(timeParams.arrBuffer, "minutes")),
        isArrTime: true,
      };

      vvs.getTrip(tripParams).then((res) => {
        trip = res;
        const legs = trip.legs;
        const legAmt = legs.length;
        const lastLeg = legs[legAmt - 1];
        const depTime = legs[0].start.date;
        const arrTime = lastLeg.end.date;

        const transitTimeParams = {
          depTime: moment(legs[0].start.date),
          depBuffer: 10,
          lateDepBuffer: 3,
        };

        timeParams.commuteDuration = trip.duration;
        if (transitLate(transitTimeParams)) {
          tripParams.date = moment(timeParams.currentTime).add(transitTimeParams.lateDepBuffer, "minutes");
          tripParams.isArrTime = false;

          vvs.getTrip(tripParams).then((res) => {
            trip = res;
            timeParams.commuteDuration = trip.duration;
            const timeToLeave = Math.ceil(moment(trip.legs[0].start.date).diff(timeParams.currentTime,
                "minutes", true));
            const minutesLate = moment(trip.legs[0].end.date).diff(timeParams.lectureStart, "minutes");
            watsonSpeech.replyWithAudio(ctx, speak.transitLate(timeToLeave)).then(() => {
              ctx.replyWithHTML(speak.minutesLate(minutesLate));
              ctx.replyWithHTML(printItinerary(trip));
            });
          });
        } else if (early(timeParams)) {
          watsonSpeech.replyWithAudio(ctx, speak.early);
          ctx.reply(speak.early);
        } else /* if on time */ {
          let interchanges = legAmt - 1;
          if (interchanges === 1) interchanges = "ein";

          const speakableTime = getSpeakableTimes(depTime, arrTime);

          watsonSpeech.replyWithAudio(ctx, speak.transitOnTime(
              speakableTime.dep, legs[0].start.stopName, speakableTime.arr,
              lastLeg.end.stopName, timeParams.commuteDuration, interchanges,
          )).then(() => ctx.replyWithHTML(printItinerary(trip)));
        }
      }).catch((err) => {
        switch (err.name) {
          case "VvsMultiplePointsError":
            ctx.reply(
                "Eine oder mehrere Adresse(n) innerhalb Deiner Präferenzen sorgen für mehrdeutige Ergebnisse." +
                "Die Adresse(n) müssen genauer in den Präferenzen angegeben werden",
            );
            break;
          case "VvsUnresolvableKeywordError":
            ctx.reply(
                "Eine oder mehrere Adresse(n) innerhalb Deiner Präferenzen sorgen für keine Ergebnisse." +
                "Bitte überprüfe Deine Adresse(n) in Präferenzen auf mögliche Tippfehler",
            );
            break;
          case "VvsInvalidParametersError":
            ctx.reply(
                "Die Suchparameter sind nicht gültig. Das ist ein internes Problem der Anwendung.",
            );
            break;
          default:
            ctx.reply("Beim VVS-Service ist etwas schiefgelaufen. Versuche es nochmal.");
            console.log(err);
            break;
        }
      });
    // ==== NON-TRANSIT CASE ===========================================================================================
    } else {
      const homeAddr = await preferences.get("home_address");
      const uniAddr = await preferences.get("uni_address");

      const tripParams = {
        origin: homeAddr,
        destination: uniAddr,
        travelMode: commutePref,
        arrivalTime: moment(timeParams.lectureStart).subtract(timeParams.buffer, "minutes"),
      };

      maps.getDirections(tripParams).then(async (res) => {
        // convert duration string to integer
        timeParams.commuteDuration = parseInt(res.duration.split(" ")[0]);
        const speakableDeparture = getSpeakableDeparture(timeParams);
        const routeUrl = maps.getGoogleMapsRedirectionURL(uniAddr);
        const lateTime = minutesLate(moment(timeParams.currentTime).add(timeParams.commuteDuration, "minutes"), timeParams.lectureStart);

        if (nonTransitLate(timeParams)) {
          await watsonSpeech.replyWithAudio(ctx, speak.nonTransitLate(lateTime));
          ctx.replyWithHTML(speak.minutesLate(lateTime));
          ctx.replyWithHTML(speak.googleMapsUrl(routeUrl));
        } else if (early(timeParams)) {
          await watsonSpeech.replyWithAudio(ctx, speak.early);
        } else /* if on time */ {
          await watsonSpeech.replyWithAudio(ctx, speak.nonTransitOnTime(speakableDeparture));
          ctx.replyWithHTML(speak.googleMapsUrl(routeUrl));
        }
      }).catch((err) => {
        console.log(err);
        return ctx.reply("Beim Google-Maps-Service ist etwas schiefgelaufen. Versuche es nochmal.");
      });
    }
  };
  return this;
};

// checks if public transportation cannot be met anymore
function transitLate(timeParams) {
  return moment(timeParams.depTime)
      .subtract(timeParams.depBuffer, "minutes")
      .isSameOrBefore(moment(timeParams.currentTime));
}

// checks if the lecture cannot be attended on time based on commute duration
function nonTransitLate(timeParams) {
  return moment(timeParams.lectureStart)
      .subtract(timeParams.commuteDuration + timeParams.arrBuffer, "minutes")
      .isSameOrBefore(moment(timeParams.currentTime));
}

// checks if lecture start occurs later than in six days (next weekday speakable)
function early(timeParams) {
  return moment(timeParams.lectureStart)
      .isAfter(moment(timeParams.currentTime)
          .add(6, "days")
          .endOf("day"));
}

// returns speakable departure and arrival times for transit
function getSpeakableTimes(depTime, arrTime) {
  return {
    dep: moment(depTime).calendar(moment(), {
      sameDay: "[um] HH [Uhr] m",
      nextWeek: "[am] dddd [um] HH [Uhr] m",
      nextDay: "[morgen um] HH [Uhr] m"}),
    arr: moment(arrTime).calendar(moment(), {
      sameDay: "[um] HH [Uhr] m",
      nextWeek: "[am] dddd [um] HH [Uhr] m",
      nextDay: "[um] HH [Uhr] m"}),
  };
}

// returns speakable departure time for non-transit
function getSpeakableDeparture(timeParams) {
  return moment(timeParams.lectureStart)
      .subtract((timeParams.arrBuffer + timeParams.commuteDuration), "minutes")
      .calendar(timeParams.currentTime, {
        sameDay: "[um] HH [Uhr] m",
        nextWeek: "[am] dddd [um] HH [Uhr] m",
        nextDay: "[um] HH [Uhr] m"},
      );
}

function printItinerary(trip) {
  let itinerary = "<b>Zusammenfassung deiner Fahrt: 🚋</b>\n\n";
  trip.legs.forEach((leg) => {
    const start = `<b>Abfahrt</b> von Haltestelle <b>${leg.start.stopName}</b> um <b>${moment(leg.start.date).format("HH:mm")} Uhr</b>.\n`;
    const mode = `<b>Beförderungsmittel</b>: ${leg.mode.type} <b>${leg.mode.code}</b> Richtung ${leg.mode.destination}.\n`;
    const stop = `<b>Ankunft</b> an Haltestelle <b>${leg.end.stopName}</b> um <b>${moment(leg.end.date).format("HH:mm")} Uhr</b>.\n\n`;
    itinerary = itinerary.concat(start, mode, stop);
  });
  return itinerary;
}

function minutesLate(arrTime, lectureStart) {
  return moment(arrTime).diff(lectureStart, "minutes");
}

