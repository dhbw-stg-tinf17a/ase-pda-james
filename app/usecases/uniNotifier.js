const watsonSpeech = require("../services/watsonSpeech")();

module.exports = function(db, oAuth2Client) {
  const prefs = require("../services/preferences.js")(db);
  const vvs = require("../services/vvs/vvs.js")();
  const cal = require("../services/gcalendar.js")(db, oAuth2Client);

  prefs.set("homeAddr", "Ernsthaldenstraße 47, Stuttgart");
  prefs.set("uniAddr", "Rotebühlplatz 41, Stuttgart");
  prefs.set("commute", "vvs");
  prefs.set("lectureCal", "1nc6dpksqqc9pk2jg85f0hd5hkn8ups1@import.calendar.google.com");

  let homeAddr;
  let uniAddr;
  let commutePref;
  let lectureCal;
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

  this.onUpdate = async function(ctx, waRes) {
    if (waRes.generic[0].text === "uniNotifier_welcome") {
      cal.authenticateUser(ctx);

      watsonSpeech.replyWithAudio(ctx, "Ich schaue mal nach, wann du los musst!");
      const validCommutePrefs = ["driving", "walking", "bicycling", "vvs"];

      if (!validCommutePrefs.includes(commutePref)) {
        return new Error("Invalid preference.");
      }

      let nextEvent;

      cal.getNextEvents(lectureCal).then((res) => {
        nextEvent = res[5];
      });

      if (commutePref === "vvs") {
        const origin = await vvs.getStopByKeyword(homeAddr);
        const destination = await vvs.getStopByKeyword(uniAddr);
        const now = new Date();
        const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        console.log(nowDate);
        const tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        console.log(tomorrowDate);
        const lectureStart = new Date(nextEvent.start.dateTime);
        const lectureDate = new Date(lectureStart.getFullYear(), lectureStart.getMonth(), lectureStart.getDate());

        vvs.getTrip({
          originId: origin.stopID,
          destinationId: destination.stopID,
          date: lectureStart,
          isArrTime: true,
        }).then((res) => {
          const trip = res[2];
          const duration = trip.duration;

          if (lectureStart <= new Date(now.getTime() + duration * 60000)) {
            return watsonSpeech.replyWithAudio(ctx, "Du bist spät dran. Nimm die nächstmögliche Bahn zur Uni!");
          }

          const legs = trip.legs;
          const legAmt = legs.length;
          const lastLeg = legs[legAmt - 1];
          let interchanges = legAmt - 1;
          const depTime = legs[0].start.date;
          const arrTime = lastLeg.end.date;

          if (interchanges === 1) interchanges = "ein";

          if (lectureDate == tomorrowDate) {
            watsonSpeech.replyWithAudio(ctx, "Die Vorlesung findet morgen oder später statt");
          } else if (lectureDate > tomorrowDate) {
            watsonSpeech.replyWithAudio(ctx, "Du hast heute und morgen erstmal keine Vorlesungen. Genieß die Freiheit.");
          }

          watsonSpeech.replyWithAudio(ctx,
              `Du bist gut in der Zeit. Nimm die Bahn um ${depTime} von der Haltestelle ${legs[0].start.stopName}. Du kommst ${arrTime} an der Haltestelle ${lastLeg.end.stopName} an. Die Fahrt dauert ${duration} Minuten. Du musst ${interchanges} mal umsteigen.`);
        });
      }
    }
  };
  return this;
};
