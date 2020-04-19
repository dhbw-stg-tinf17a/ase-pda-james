const watsonSpeech = require("../services/watsonSpeech")(); // voice I/O handling

const dialog = require("./uniNotifier.resp.js")(); // constant answers for voice assistant
const util = require("./uniNotifier.util.js")();

const moment = require("moment"); // date manipulation library
moment.locale("de"); // set dates to German standard

module.exports = (preferences, oAuth2Client) => {
  const vvs = require("../services/vvs/vvs.js")();
  const maps = require("../services/gmaps.js");
  const cal = require("../services/gcalendar.js")(preferences, oAuth2Client);

  // ===================================================================================================================
  // WATSON ASSISTANT DIALOG HANDLING
  // ===================================================================================================================
  this.onUpdate = async function(ctx, waRes) {
    // check if WA intent corresponds
    if (waRes.generic[0].text !== "uniNotifier_welcome") {
      return new Error("Unknown intent.");
    }

    ctx.replyWithHTML(dialog.firstResponse);

    const commutePref = await preferences.get("commute");
    const validCommutePrefs = ["driving", "walking", "bicycling", "vvs"];
    if (!validCommutePrefs.includes(commutePref)) {
      return new Error("Invalid preference.");
    }

    const lectureCal = await preferences.get("lecture_cal_id");
    const nextLectures = await cal.getNextEvents(lectureCal);

    if (nextLectures.length === 0) {
      ctx.replyWithHTML(dialog.calEmpty);
      return new Error("Lecture Calendar is empty.");
    }

    const nextLecture = nextLectures[0]; // first API response element always returns next or current lecture

    const timeParams = {
      currentTime: moment().toISOString(true),
      lectureStart: moment(nextLecture.start.dateTime),
      lectureEnd: moment(nextLecture.end.dateTime),
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

      const transitTimeParams = {
        depTime: null, // to be filled after API call
        arrTime: null, // to be filled after API call
        depBuffer: 10,
        lateDepBuffer: 3,
      };

      vvs.getTrip(tripParams).then((res) => {
        trip = res;
        const legs = trip.legs;
        const legAmt = legs.length;
        const lastLeg = legs[legAmt - 1];

        // receive departure and arrival information
        transitTimeParams.depTime = moment(legs[0].start.date);
        transitTimeParams.arrTime = moment(lastLeg.end.date);
        timeParams.commuteDuration = trip.duration;

        if (util.transitLate(transitTimeParams)) {
          // set new departure time to now incl. short buffer to reach first stop
          tripParams.date = moment(timeParams.currentTime).add(transitTimeParams.lateDepBuffer, "minutes");
          tripParams.isArrTime = false; // API calculates departures at the given time

          vvs.getTrip(tripParams).then((res) => {
            trip = res;
            const legs = trip.legs;
            const legAmt = legs.length;
            const lastLeg = legs[legAmt - 1];

            // update departure and arrival information
            transitTimeParams.depTime = moment(legs[0].start.date);
            transitTimeParams.arrTime = moment(lastLeg.end.date);
            timeParams.commuteDuration = trip.duration;

            if (util.lectureEndsOnArrival(timeParams)) {
              return watsonSpeech.replyWithAudio(ctx, dialog.lectureEndsBeforeArrival);
            }

            // calculate full minutes until the first connection leaves the stop
            const timeToLeave = util.timeToLeave(transitTimeParams.depTime, timeParams.currentTime);
            // calculate the minutes the user is approx. going to be late for class
            const minutesLate = util.minutesLate(transitTimeParams.arrTime, timeParams.lectureStart);

            watsonSpeech.replyWithAudio(ctx, dialog.transitLate(timeToLeave)).then(() => {
              ctx.replyWithHTML(dialog.minutesLate(minutesLate));
              ctx.replyWithHTML(util.printItinerary(trip));
            });
          });
        } else if (util.early(timeParams)) {
          watsonSpeech.replyWithAudio(ctx, dialog.early);
        } else /* if on time */ {
          let interchanges = legAmt - 1;
          if (interchanges === 1) interchanges = "ein";

          const speakableTime = util.getSpeakableTimes(transitTimeParams.depTime, transitTimeParams.arrTime);

          watsonSpeech.replyWithAudio(ctx, dialog.transitOnTime(
              speakableTime.dep, legs[0].start.stopName, speakableTime.arr,
              lastLeg.end.stopName, timeParams.commuteDuration, interchanges,
          )).then(() => ctx.replyWithHTML(util.printItinerary(trip)));
        }
      }).catch((err) => {
        switch (err.name) {
          case "VvsInvalidParametersError":
            ctx.reply(`
                Die Suchparameter sind nicht gültig. Das ist ein internes Problem der Anwendung und erfordert\ 
                    vermutlich eine Neukonfiguration mithilfe der Eingabe von <b>/start<b></b>.
           `);
            break;
          default:
            ctx.reply("Beim VVS-Service ist etwas schiefgelaufen. Versuche es nochmal.");
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

      maps.getDirections(tripParams).then((res) => {
        // convert duration string to integer
        timeParams.commuteDuration = res.value;
        const speakableDeparture = util.getSpeakableDeparture(timeParams);
        const routeUrl = maps.getGoogleMapsRedirectionURL(uniAddr);

        const estimatedArrival = moment(timeParams.currentTime)
            .add(timeParams.commuteDuration, "minutes")
            .add(timeParams.arrBuffer, "minutes");
        const lateTime = util.minutesLate(estimatedArrival, timeParams.lectureStart);

        if (util.nonTransitLate(timeParams)) {
          if (util.lectureEndsOnArrival(timeParams)) {
            return watsonSpeech.replyWithAudio(ctx, dialog.lectureEndsBeforeArrival);
          }
          watsonSpeech.replyWithAudio(ctx, dialog.nonTransitLate(lateTime)).then(() => {
            ctx.replyWithHTML(dialog.minutesLate(lateTime));
            ctx.replyWithHTML(dialog.googleMapsUrl(routeUrl));
          });
        } else if (util.early(timeParams)) {
          watsonSpeech.replyWithAudio(ctx, dialog.early);
        } else /* if on time */ {
          watsonSpeech.replyWithAudio(ctx, dialog.nonTransitOnTime(speakableDeparture)).then(() => {
            ctx.replyWithHTML(dialog.googleMapsUrl(routeUrl));
          });
        }
      }).catch(() => {
        return ctx.reply("Beim Google-Maps-Service ist etwas schiefgelaufen. Versuche es nochmal.");
      });
    }
  };
  return this;
};
