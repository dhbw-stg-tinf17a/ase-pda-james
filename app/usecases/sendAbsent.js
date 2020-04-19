const gplaces = require("../services/gplaces")();
const mailer = require("../services/mailer")();
const watsonSpeech = require("../services/watsonSpeech")();
const { createEmailText, createEmailOptions, setAbsentTimes } = require("../utils/sendAbsentHelpers");

module.exports = (preferences, oAuthClient) => {
  const gcalendar = require("../services/gcalendar")(preferences, oAuthClient);
  let lectureCalId;
  let homeAddress;
  let absentTimes = {};
  this.onUpdate = (ctx, waRes) => {
    switch (waRes.generic[0].text) {
      case "absent_welcome":
        return watsonSpeech.replyWithAudio(ctx, "Warum gehst du nicht in die Uni?")
            .catch((err) => {
              ctx.reply("Warum gehst du nicht in die Uni?");
              console.error(err);
            });
      case "absent_reason_else":
        return watsonSpeech.replyWithAudio(ctx, "Wie lange wirst du nicht in die Uni kommen?")
            .catch((err) => {
              ctx.reply("Wie lange wirst du nicht in die Uni kommen?");
              console.error(err);
            });
      case "absent_time":
        ctx.reply("Ok");
        return this.hasUni(waRes)
            .then(() => this.sendMail(ctx, waRes))
            .catch(() => {
              if (waRes.context.absentReason === "Krankheit") {
                return watsonSpeech.replyWithAudio(ctx,
                    "Du hast zu dieser Zeit keine Uni. Aber ich hoffe es geht dir bald besser")
                    .catch((err) => {
                      ctx.reply("Du hast zu dieser Zeit keine Uni. Aber ich hoffe es geht dir bald besser");
                      console.error(err);
                    });
              } else {
                return watsonSpeech.replyWithAudio(ctx,
                    "Du hast zu dieser Zeit keine Uni. Aber ich wünsche dir viel Erfolg")
                    .catch((err) => {
                      ctx.reply("Du hast zu dieser Zeit keine Uni. Aber ich wünsche dir viel Erfolg");
                      console.error(err);
                    });
              }
            });

      case "absent_reason_sick":
        watsonSpeech.replyWithAudio(ctx, "Das tut mir leid. Gute Besserung")
            .catch((err) => {
              ctx.reply("Das tut mir leid. Gute Besserung");
              console.error(err);
            });
        this.hasUni(waRes)
            .then(() => this.sendMail(ctx, waRes))
            .catch(() => {
              return watsonSpeech.replyWithAudio(ctx,
                  "Du hast zu dieser Zeit keine Uni. Aber ich hoffe es geht dir bald besser")
                  .catch((err) => {
                    ctx.reply("Du hast zu dieser Zeit keine Uni. Aber ich hoffe es geht dir bald besser");
                    console.error(err);
                  });
            });
        this.findPharmacy(ctx);
        break;
    }
  };


  this.hasUni = (waRes) => {
    return new Promise(async (resolve, reject) => {
      absentTimes = setAbsentTimes(waRes);
      const lectureCalId = await preferences.get("lecture_cal_id");

      gcalendar.getBusySlotsByCalendarId(absentTimes.startAbsent, absentTimes.endAbsent, lectureCalId)
          .then((res) => {
            if (res.length === 0) {
              // eslint-disable-next-line prefer-promise-reject-errors
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


  this.sendMail = async (ctx, waRes) => {
    const emailMessage = await createEmailText(preferences,
        absentTimes,
        waRes.context.absentReason);
    const emailOptions = await createEmailOptions(preferences, emailMessage);
    return mailer.sendMail(emailOptions)
        .then(() => {
          if (waRes.context.absentReason === "Krankheit") {
            return watsonSpeech.replyWithAudio(ctx,
                "Ich habe nun eine Mail an das Sekretariat geschickt. Ich hoffe es geht dir bald besser")
                .catch((err) => {
                  ctx.reply("Ich habe nun eine Mail an das Sekretariat geschickt. Ich hoffe es geht dir bald besser");
                  console.error(err);
                });
          } else {
            return watsonSpeech.replyWithAudio(ctx,
                "Ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg")
                .catch((err) => {
                  ctx.reply("Ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
                  console.error(err);
                });
          }
        })
        .catch(() => {
          return watsonSpeech.replyWithAudio(ctx,
              "Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut")
              .catch((err) => {
                ctx.reply("Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut");
                console.error(err);
              });
        });
  };

  this.findPharmacy = async (ctx) => {
    const homeAddress = await preferences.get("home_address_coordinates");

    return gplaces.getPlaces({
      query: "Apotheke",
      location: homeAddress,
      rankby: "distance",
    }).then((answer) => {
      return watsonSpeech.replyWithAudio(ctx,
          "Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:")
          .then(() => {
            gplaces.getPlaceById(answer.results[0].place_id)
                .then((res) => ctx.reply(res.result.url))
                .catch((err) => {
                  console.error(err);
                  ctx.reply(answer.results[0].name);
                });
          })
          .catch((err) => {
            ctx.reply("Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:");
            gplaces.getPlaceById(answer.results[0].place_id)
                .then((res) => ctx.reply(res.result.url))
                .catch((err) => {
                  console.error(err);
                  ctx.reply(answer.results[0].name);
                });
            console.error(err);
          });
    }).catch(() => {
      return watsonSpeech.replyWithAudio(ctx,
          "Ich konnte leider keine Apotheke finden. Ich hoffe dir geht es trotzdem bald besser")
          .catch((err) => {
            ctx.reply("Ich konnte leider keine Apotheke finden. Ich hoffe dir geht es trotzdem bald besser");
            console.error(err);
          });
    });
  };
  return this;
};
