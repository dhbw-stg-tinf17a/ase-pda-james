const moment = require("moment"); // Date manipulation library
const watsonSpeech = require("../services/watsonSpeech")(); // Speech handling

module.exports = (db, oAuth2Client) => {
  const prefs = require("../services/preferences.js")(db);
  const vvs = require("../services/vvs/vvs.js")();
  const maps = require("../services/gmaps.js");
  const cal = require("../services/gcalendar.js")(db, oAuth2Client);
  moment.locale("de");

  // TEMP getting and setting preferences ====================================================
  let homeAddr;
  let uniAddr;
  let commutePref;
  let lectureCal;

  prefs.set("homeAddr", "Im Wiesengrund 40, Nufringen");
  prefs.set("uniAddr", "Rotebühlplatz 41, Stuttgart");
  prefs.set("commute", "vvs");
  prefs.set("lectureCal", "jamesaseprojekt@gmail.com");

  prefs.get("homeAddr").then((res) => {
    homeAddr = res;
  });
  prefs.get("uniAddr").then((res) => {
    uniAddr = res;
  });
  prefs.get("commute").then((res) => {
    commutePref = res;
  });
  prefs.get("lectureCal").then((res) => {
    lectureCal = res;
  });
  // =========================================================================================

  this.onUpdate = async function(ctx, waRes) {
    if (waRes.generic[0].text === "uniNotifier_welcome") {
      cal.authenticateUser(ctx);
      // watsonSpeech.replyWithAudio(ctx, "Ich schaue mal nach, wann du los musst!");

      const validCommutePrefs = ["driving", "walking", "bicycling", "vvs"];

      if (!validCommutePrefs.includes(commutePref)) {
        return new Error("Invalid preference.");
      }

      const nextLectures = await cal.getNextEvents(lectureCal);
      const nextLecture = nextLectures[0];

      const timeParams = {
        currentTime: moment(),
        lectureStart: moment(nextLecture.start.dateTime),
        buffer: 10,
      };

      if (commutePref === "vvs") {
        const origin = await vvs.getStopByKeyword(homeAddr);
        const destination = await vvs.getStopByKeyword(uniAddr);

        const tripParams = {
          originId: origin.stopID,
          destinationId: destination.stopID,
          date: new Date(timeParams.lectureStart.subtract(timeParams.buffer, "minutes")),
          isArrTime: true,
        };

        vvs.getTrip(tripParams).then((res) => {
          const trip = res[2];
          timeParams.commuteDuration = trip.duration;

          if (late(timeParams)) {
            return console.log("Bruder, du musst dringend los");
          } else if (early(timeParams)) {
            return console.log("Frei bis nächste Woche");
          } else /* if on time */ {
            const legs = trip.legs;
            const legAmt = legs.length;
            const lastLeg = legs[legAmt - 1];
            const depTime = legs[0].start.date;
            const arrTime = lastLeg.end.date;

            let interchanges = legAmt - 1;
            if (interchanges === 1) interchanges = "ein";

            const speakableTime = getSpeakableTimes(depTime, arrTime);

            return console.log(`Du bist gut in der Zeit. Nimm die Bahn ${speakableTime.dep} von der Haltestelle ${legs[0].start.stopName}. Du kommst ${speakableTime.arr} an der Haltestelle ${lastLeg.end.stopName} an. Die Fahrt dauert ${timeParams.commuteDuration} Minuten. Du musst ${interchanges} mal umsteigen.`);
          }
        });
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

          if (late(timeParams)) {
            console.log("Schwing dich auf's Rad und hau weg!");
          } else if (early(timeParams)) {
            console.log("Frei bis nächste Woche");
          } else {
            console.log(`Du bist gut in der Zeit. Mach' dich ${speakableDeparture} auf den Weg zur Uni, dann bist Du püunktlich zur Vorlesung da!`);
            console.log(maps.getGoogleMapsRedirectionURL(uniAddr));
          }
        });
      }
    }
  };
  return this;
};

function late(timeParams) {
  return timeParams.lectureStart
      .subtract(timeParams.buffer, "minutes")
      .isSameOrBefore(moment(timeParams.currentTime)
          .add(timeParams.commuteDuration, "minutes"));
}

function early(timeParams) {
  return timeParams.lectureStart.
      isAfter(moment(timeParams.currentTime)
          .add(6, "days")
          .endOf("day"));
}

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

function getSpeakableDeparture(timeParams) {
  return moment(timeParams.lectureStart)
      .subtract((timeParams.buffer + timeParams.commuteDuration), "minutes")
      .calendar(timeParams.currentTime, {
        sameDay: "[um] HH [Uhr] m",
        nextWeek: "[am] dddd [um] HH [Uhr] m",
        nextDay: "[um] HH [Uhr] m"},
      );
}
