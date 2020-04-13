const moment = require("moment"); // date manipulation library
const watsonSpeech = require("../services/watsonSpeech")(); // voice I/O handling
const speak = require("../../app/waResponses.js").uniNotifier(); // constant answers for voice assistant


module.exports = (preferences, oAuth2Client) => {
  // const prefs = require("../services/preferences.js")(db);
  const vvs = require("../services/vvs/vvs.js")();
  const maps = require("../services/gmaps.js");
  const cal = require("../services/gcalendar.js")(preferences, oAuth2Client);
  moment.locale("de");

  // ==== TEMPORARY: getting and setting preferences ===================================================================
  // let homeAddr;
  // let uniAddr;
  // let commutePref;
  // let lectureCal;
  //
  // prefs.set("homeAddr", "Ernsthaldenstraße 47, Stuttgart");
  // prefs.set("uniAddr", "Rotebühlplatz 41, Stuttgart");
  // prefs.set("commute", "vvs");
  // prefs.set("lectureCal", "jamesaseprojekt@gmail.com");
  //
  // prefs.get("homeAddr").then((res) => {
  //   homeAddr = res;
  // });
  // prefs.get("uniAddr").then((res) => {
  //   uniAddr = res;
  // });
  // prefs.get("commute").then((res) => {
  //   commutePref = res;
  // });
  // prefs.get("lectureCal").then((res) => {
  //   lectureCal = res;
  // });
  // ===================================================================================================================

  this.onUpdate = async function(ctx, waRes) {
    // check if WA intent corresponds
    if (waRes.generic[0].text !== "uniNotifier_welcome") {
      return new Error("Unknown intent.");
    }

    // TEMPORARY: provide Google authentication URL
    cal.authenticateUser(ctx);

    watsonSpeech.replyWithAudio(ctx, speak.firstResponse);

    const validCommutePrefs = ["driving", "walking", "bicycling", "vvs"];
    if (!validCommutePrefs.includes(commutePref)) {
      return new Error("Invalid preference.");
    }

    const nextLectures = await cal.getNextEvents(lectureCal);
    const nextLecture = nextLectures[0]; // first API response element always returns next or current lecture

    const timeParams = {
      currentTime: moment(),
      lectureStart: moment(nextLecture.start.dateTime),
      buffer: 10,
    };

    // ==== TRANSIT CASE ===============================================================================================
    if (commutePref === "vvs") {
      const origin = await vvs.getStopByKeyword(homeAddr);
      const destination = await vvs.getStopByKeyword(uniAddr);

      const tripParams = {
        originId: origin.stopID,
        destinationId: destination.stopID,
        date: moment(timeParams.lectureStart.subtract(timeParams.buffer, "minutes")),
        isArrTime: true,
      };

      vvs.getTrip(tripParams).then((res) => {
        const trip = res[2]; // third API response element always returns closest arrival to desired arrival
        timeParams.commuteDuration = trip.duration;

        if (late(timeParams)) {
          watsonSpeech.replyWithAudio(ctx, speak.transitLate);
        } else if (early(timeParams)) {
          watsonSpeech.replyWithAudio(ctx, speak.early);
        } else /* if on time */ {
          const legs = trip.legs;
          const legAmt = legs.length;
          const lastLeg = legs[legAmt - 1];
          const depTime = legs[0].start.date;
          const arrTime = lastLeg.end.date;

          let interchanges = legAmt - 1;
          if (interchanges === 1) interchanges = "ein";

          const speakableTime = getSpeakableTimes(depTime, arrTime);

          watsonSpeech.replyWithAudio(ctx, speak.transitOnTime(
              speakableTime.dep, legs[0].start.stopName, speakableTime.arr,
              lastLeg.end.stopName, timeParams.commuteDuration, interchanges,
          ));
          // TODO: Formatted summary of transit itinerary.
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
            break;
        }
      });
    // ==== NON-TRANSIT CASE ===========================================================================================
    } else {
      const tripParams = {
        origin: homeAddr,
        destination: uniAddr,
        travelMode: commutePref,
        arrivalTime: timeParams.lectureStart - timeParams.buffer,
      };

      maps.getDirections(tripParams).then((res) => {
        timeParams.commuteDuration = parseInt(res.duration.split(" ")[0]);
        const speakableDeparture = getSpeakableDeparture(timeParams);
        const routeUrl = maps.getGoogleMapsRedirectionURL(uniAddr);

        if (late(timeParams)) {
          watsonSpeech(ctx, speak.nonTransitLate);
        } else if (early(timeParams)) {
          watsonSpeech.replyWithAudio(ctx, speak.early);
        } else /* if on time */ {
          watsonSpeech.replyWithAudio(ctx, speak.nonTransitOnTime(speakableDeparture));
          console.log(maps.getGoogleMapsRedirectionURL(uniAddr));
        }

        watsonSpeech.replyWithAudio(ctx, speak.googleMapsUrl);
        ctx.reply(routeUrl);
      }).catch(() => {
        return ctx.reply("Beim Google-Maps-Service ist etwas schiefgelaufen. Versuche es nochmal.");
      });
    }
  };
  return this;
};

// checks if lecture start (incl. buffer) has already taken place
function late(timeParams) {
  return timeParams.lectureStart
      .subtract(timeParams.buffer, "minutes")
      .isSameOrBefore(moment(timeParams.currentTime)
          .add(timeParams.commuteDuration, "minutes"));
}

// checks if lecture start occurs later than in six days (next weekday speakable)
function early(timeParams) {
  return timeParams.lectureStart.
      isAfter(moment(timeParams.currentTime)
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
      .subtract((timeParams.buffer + timeParams.commuteDuration), "minutes")
      .calendar(timeParams.currentTime, {
        sameDay: "[um] HH [Uhr] m",
        nextWeek: "[am] dddd [um] HH [Uhr] m",
        nextDay: "[um] HH [Uhr] m"},
      );
}
