const gplaces = require("../services/gplaces")();
const mailer = require("../services/mailer")();
const watsonSpeech = require("../services/watsonSpeech")();
const lectureCalId="1nc6dpksqqc9pk2jg85f0hd5hkn8ups1@import.calendar.google.com"; // TO-DO Replace with Preference of lecture calendar
let absentReason;
let startAbsent;
let endAbsent;
let startAbsentDay = null;
let endAbsentDay;
let startAbsentTime = null;
let endAbsentTime;


module.exports = (db, oAuth2Client) => {
  const gcalendar = require("../services/gcalendar")(db, oAuth2Client);
  const preferences = require("../services/preferences")(db);
  const mail ={
    recipient: "jamesaseprojekt@gmail.com", // TO-DO Replace with Preference of secretary mail address
    subject: "Abwesenheit",
    text: "",
    htmlText: "",
  };
  this.onUpdate = (ctx, waRes)=>{
    this.convertEntityDates(waRes);
    this.convertEntityReasons(waRes);
    switch (waRes.generic[0].text) {
      case "absent_welcome":
        watsonSpeech.replyWithAudio(ctx, "Warum gehst du nicht in die Uni?");
        break;
      case "absent_reason_else":
        watsonSpeech.replyWithAudio(ctx, "Wie lange wirst du nicht in die Uni kommen?");
        break;
      case "absent_time":
        ctx.reply("Ok");
        this.sendMail(ctx);
        break;
      case "absent_reason_sick":
        watsonSpeech.replyWithAudio(ctx, "Das tut mir leid. Gute Besserung");
        this.sendMail(ctx, waRes);
        gplaces.getPlaces({
          query: "Apotheke",
          location: "48.805960, 9.234850", // TO-DO Replace with Preference of home address
          rankby: "distance",
        })
            .then((answer)=>{
              watsonSpeech.replyWithAudio(ctx, "Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:");
              console.log(answer.results[0].place_id);
              gplaces.getPlaceById(answer.results[0].place_id)
                  .then((res) => ctx.reply(res.result.url))
                  .catch((err) => ctx.reply("error: " + err + answer.results[0].name));
            })
            .catch((err)=>{
              watsonSpeech.replyWithAudio(ctx, "Ich konnte leider keine Apotheke finden. Ich hoffe dir geht es trotzdem bald besser");
            });
        break;
    }
  };

  this.convertEntityDates = (waRes) => {
    waRes.entities.forEach((entity) => {
      if (entity.entity === "sys-date" && startAbsentDay === null ) {
        startAbsentDay = entity.value;
      } else if (entity.entity === "sys-date") {
        endAbsentDay = entity.value;
      } else if (entity.entity === "sys-time" && startAbsentTime === null) {
        startAbsentTime = entity.value;
      } else if (entity.entity === "sys-time") {
        endAbsentTime = entity.value;
      }
    });
  };

  this.convertEntityReasons = (waRes) => {
    waRes.entities.forEach((entity) => {
      if (entity.entity === "absent_reason" ) {
        absentReason= entity.value;
      }
    });
  };

  this.setAbsentTimes =() =>{
    if (!startAbsentDay) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      startAbsentDay = yyyy + "-" + mm + "-" + dd;
      endAbsentDay = startAbsentDay;
    }
    if (!endAbsentDay) {
      endAbsentDay = startAbsentDay;
    }
    if (startAbsentTime !== null && endAbsentTime !== null) {
      startAbsent = startAbsentDay + "T" + startAbsentTime + "+02:00";
      endAbsent = endAbsentDay + "T" + endAbsentTime + "+02:00";
    } else if (startAbsentTimeIndex !== null && endAbsentTimeIndex === null ) {
      startAbsent = startAbsentDay + "T" + startAbsentTime + "+02:00";
      endAbsent = endAbsentDay + "T" + "22:30:00" + "+02:00";
    } else {
      startAbsent = startAbsentDay + "T" + "06:00:00" + "+02:00";
      endAbsent = endAbsentDay + "T" + "22:30:00" + "+02:00";
    }
  };

  this.sendMail =(ctx) =>{
    this.setAbsentTimes();
    if ( absentReason=== "Krankheit") {
      mail.htmlText="<p>Guten Tag,</p> </br> <p>Ich kann am " + startAbsentDay + " von " + startAbsentTime +" bis " +
      endAbsentTime + " aufgrund von "+ absentReason +
      " die Vorlesungen nicht besuchen.</p> </br> <p> Mit freundlichen Grüßen</p>";
    } else {
      mail.htmlText="<p>Guten Tag,</p> </br> <p>Ich kann am " + startAbsentDay + " von " + startAbsentTime +" bis " +
      endAbsentTime + " aufgrund eines "+ absentReason +
      " die Vorlesungen nicht besuchen.</p> </br> <p> Mit freundlichen Grüßen</p>";
    }
    preferences.get("name").then((res) => {
      mail.htmlText= mail.htmlText + "</br> <p>" + res + "</p>";
    });
    gcalendar.getBusySlotsByCalendarId(startAbsent, endAbsent, lectureCalId)
        .then((res) => {
          if (res.length === 0) {
            watsonSpeech.replyWithAudio(ctx, "Du hast zu dieser Zeit keine Uni. Aber ich wünsche dir viel Erfolg");
          } else {
            mailer.sendMail(mail)
                .then(()=>{
                  if (absentReason === "Krankheit") {
                    watsonSpeech.replyWithAudio(ctx, "Ich habe nun eine Mail an das Sekretariat geschickt. Ich hoffe es geht dir bald besser");
                  } else {
                    watsonSpeech.replyWithAudio(ctx, "Ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
                  }
                })
                .catch(()=>{
                  watsonSpeech.replyWithAudio(ctx, "Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut");
                });
          }
        })
        .catch((err) => {
          mailer.sendMail(mail)
              .then(()=>{
                ctx.reply("Ich bin mir nicht sicher, ob du zu dieser Zeit Uni hast. Aber ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
              })
              .catch(()=>{
                ctx.reply("Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut");
              });
        });

    startAbsentDay=null;
    endAbsentDay=null;
    startAbsentDayFound=null;
    startAbsentTime=null;
    endAbsentTime=null;
  };
  return this;
};
