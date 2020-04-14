const gplaces = require("../services/gplaces")();
const mailer = require("../services/mailer")();
const watsonSpeech = require("../services/watsonSpeech")();
// TODO: Replace with Preference of lecture calendar
const lectureCalId = "1nc6dpksqqc9pk2jg85f0hd5hkn8ups1@import.calendar.google.com";
const moment = require("moment");

module.exports = (preferences, oAuth2Client) => {
  this.absentReason = null;
  this.startAbsent = null;
  this.endAbsent = null;
  this.startAbsentDay = null;
  this.endAbsentDay = null;
  this.startAbsentTime = null;
  this.endAbsentTime = null;
  const gcalendar = require("../services/gcalendar")(preferences, oAuth2Client);
  // const preferences = require("../services/preferences")(db);
  const mail ={
    recipient: "jamesaseprojekt@gmail.com", // TO-DO Replace with Preference of secretary mail address
    subject: "Abwesenheit",
    text: "",
    htmlText: "",
  };
  this.onUpdate = (ctx, waRes) => {
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
        }).then((answer) => {
          watsonSpeech.replyWithAudio(ctx,
              "Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:");
          gplaces.getPlaceById(answer.results[0].place_id)
              .then((res) => ctx.reply(res.result.url))
              .catch((err) => ctx.reply("error: " + err + answer.results[0].name));
        }).catch((err) => {
          watsonSpeech.replyWithAudio(ctx,
              "Ich konnte leider keine Apotheke finden. Ich hoffe dir geht es trotzdem bald besser");
        });
        break;
    }
  };

  // fetches entities from WatsonAssistant result and saves them as variables
  this.convertEntityDates = (waRes) => {
    waRes.entities.forEach((entity) => {
      // checks if startAbsentDay already set if yes it will set it as endAbsentDay
      if (entity.entity === "sys-date" && this.startAbsentDay === null) {
        this.startAbsentDay = entity.value;
      } else if (entity.entity === "sys-date") {
        this.endAbsentDay = entity.value;
        // checks if startAbsentTime already set if yes it will set it as endAbsentTime
      } else if (entity.entity === "sys-time" && this.startAbsentTime === null) {
        this.startAbsentTime = entity.value;
      } else if (entity.entity === "sys-time") {
        this.endAbsentTime = entity.value;
      }
    });
  };

  this.convertEntityReasons = (waRes) => {
    waRes.entities.forEach((entity) => {
      if (entity.entity === "absent_reason") {
        this.absentReason = entity.value;
      }
    });
  };
  // sets Absent Times depending on what was already specified in the Watson Assistant response
  this.setAbsentTimes = () => {
    const today = moment().format("YYYY-MM-DD");
    if (!this.startAbsentDay) {
      this.startAbsentDay = today;
      this.endAbsentDay = today;
    }
    if (!this.endAbsentDay) {
      this.endAbsentDay = this.startAbsentDay;
    }
    if (this.startAbsentTime !== null && this.endAbsentTime !== null) {
      this.startAbsent = this.startAbsentDay + "T" + this.startAbsentTime + "+02:00";
      this.endAbsent = this.endAbsentDay + "T" + this.endAbsentTime + "+02:00";
    } else if (this.startAbsentTime !== null && this.endAbsentTime === null) {
      this.startAbsent = this.startAbsentDay + "T" + this.startAbsentTime + "+02:00";
      this.endAbsent = this.endAbsentDay + "T" + "22:30:00" + "+02:00";
    } else {
      this.startAbsent = this.startAbsentDay + "T" + "06:00:00" + "+02:00";
      this.endAbsent = this.endAbsentDay + "T" + "22:30:00" + "+02:00";
    }
    console.log(this.startAbsent, this.endAbsent);
  };

  this.sendMail = (ctx) => {
    this.setAbsentTimes();
    if (this.absentReason === "Krankheit") {
      mail.htmlText = "<p>Guten Tag,</p> </br> <p>Ich kann am " + this.startAbsentDay + " von " +
          this.startAbsentTime + " bis " + this.endAbsentTime + " aufgrund von " + this.absentReason +
          " die Vorlesungen nicht besuchen.</p> </br> <p> Mit freundlichen Grüßen</p>";
    } else {
      mail.htmlText = "<p>Guten Tag,</p> </br> <p>Ich kann am " + this.startAbsentDay + " von " +
          this.startAbsentTime + " bis " + this.endAbsentTime + " aufgrund eines " + this.absentReason +
          " die Vorlesungen nicht besuchen.</p> </br> <p> Mit freundlichen Grüßen</p>";
    }
    preferences.get("name").then((res) => {
      mail.htmlText = mail.htmlText + "</br> <p>" + res + "</p>";
    });
    gcalendar.getBusySlotsByCalendarId(this.startAbsent, this.endAbsent, lectureCalId)
        .then((res) => {
          if (res.length === 0) {
            watsonSpeech.replyWithAudio(ctx, "Du hast zu dieser Zeit keine Uni. Aber ich wünsche dir viel Erfolg");
          } else {
            mailer.sendMail(mail)
                .then(() => {
                  if (this.absentReason === "Krankheit") {
                    watsonSpeech.replyWithAudio(ctx,
                        "Ich habe nun eine Mail an das Sekretariat geschickt. Ich hoffe es geht dir bald besser");
                  } else {
                    watsonSpeech.replyWithAudio(ctx,
                        "Ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
                  }
                })
                .catch(() => {
                  watsonSpeech.replyWithAudio(ctx,
                      "Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut");
                });
          }
        })
        .catch((err) => {
          mailer.sendMail(mail)
              .then(() => {
                ctx.reply("Ich bin mir nicht sicher, ob du zu dieser Zeit Uni hast. Aber ich habe nun eine Mail an " +
                    "das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
              })
              .catch(() => {
                ctx.reply("Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut");
              });
        });

    this.startAbsentDay = null;
    this.endAbsentDay = null;
    this.startAbsentDayFound = null;
    this.startAbsentTime = null;
    this.endAbsentTime = null;
  };

  return this;
};
