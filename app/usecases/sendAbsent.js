const gplaces = require("../services/gplaces")();
const mailer = require("../services/mailer")();
const watsonSpeech = require("../services/watsonSpeech")();
const preferences = require("../services/preferences")();
const gcalendar = require("../services/gcalendar")();
const {createEmailText, createEmailOptions, setAbsentTimes} = require("../utils/sendAbsentHelpers");

module.exports = () => {
  let lectureCalId;
  let homeAddress;
  let absentTimes = {};

  this.onUpdate = (ctx, waRes) => {
    switch (waRes.generic[0].text) {
      case "absent_welcome":
        watsonSpeech.replyWithAudio(ctx, "Warum gehst du nicht in die Uni?");
        break;
      case "absent_reason_else":
        watsonSpeech.replyWithAudio(ctx, "Wie lange wirst du nicht in die Uni kommen?");
        break;
      case "absent_time":
        ctx.reply("Ok");
        this.hasUni(waRes)
            .then(() => this.sendMail(ctx, waRes))
            .catch(() => {
              if (waRes.context.absentReason === "Krankheit") {
                watsonSpeech.replyWithAudio(ctx,
                    "Du hast zu dieser Zeit keine Uni. Aber ich hoffe es geht dir bald besser");
              } else {
                watsonSpeech.replyWithAudio(ctx, "Du hast zu dieser Zeit keine Uni. Aber ich wünsche dir viel Erfolg");
              }
            });
        break;
      case "absent_reason_sick":
        watsonSpeech.replyWithAudio(ctx, "Das tut mir leid. Gute Besserung");
        this.hasUni(waRes)
            .then(() => this.sendMail(ctx, waRes))
            .catch(() => {
              watsonSpeech.replyWithAudio(ctx,
                  "Du hast zu dieser Zeit keine Uni. Aber ich hoffe es geht dir bald besser");
            });
        this.findPharmacy(ctx);
        break;
    }
  };


  this.hasUni = (waRes) => {
    return new Promise((resolve, reject)=>{
      absentTimes = setAbsentTimes(waRes);
      lectureCalId = "1nc6dpksqqc9pk2jg85f0hd5hkn8ups1@import.calendar.google.com";

      // preferences.get("lecture_cal_id").then((res) => {
      //   lectureCalId = res;
      // })

      console.log(absentTimes.startAbsent, absentTimes.endAbsent);
      gcalendar.getBusySlotsByCalendarId(absentTimes.startAbsent, absentTimes.endAbsent, lectureCalId)
          .then((res) => {
            console.log(res);
            if (res.length === 0) {
              reject(false);
            } else {
              resolve(true);
            }
          })
          .catch((err) => {
            console.error(err);
            resolve(true);
          });
    });
  };


  this.sendMail = (ctx, waRes) => {
    const emailMessage = createEmailText(
        absentTimes,
        waRes.context.absentReason);
    const emailOptions = createEmailOptions(emailMessage);
    mailer.sendMail(emailOptions)
        .then(() => {
          if (waRes.context.absentReason === "Krankheit") {
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
  };

  this.findPharmacy = (ctx) => {
    homeAddress = "48.805960, 9.234850";

    // preferences.get("home_address_coordinates")
    //     .then((res) => {
    //       homeAddress = res;
    //     });

    gplaces.getPlaces({
      query: "Apotheke",
      location: homeAddress,
      rankby: "distance",
    }).then((answer) => {
      watsonSpeech.replyWithAudio(ctx, "Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:")
          .then(() => {
            gplaces.getPlaceById(answer.results[0].place_id)
                .then((res) => ctx.reply(res.result.url))
                .catch((err) => ctx.reply("error: " + err + answer.results[0].name));
          });
    }).catch(() => {
      watsonSpeech.replyWithAudio(ctx,
          "Ich konnte leider keine Apotheke finden. Ich hoffe dir geht es trotzdem bald besser");
    });
  };
  return this;
};
