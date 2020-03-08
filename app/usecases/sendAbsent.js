const gplaces = require("../services/gplaces")();
const mailer = require("../services/mailer")();
const watsonSpeech = require("../services/watsonSpeech")();
const watsonAssisstant = require("../services/watsonAssistant")();
let sessionId;

module.exports = function() {
  this.onUpdate = (ctx)=>{
    if (ctx.update.message.text) {
      let assistantOutput;
      this.checkSession()
          .then(() => {
            watsonAssisstant.sendInput(sessionId, ctx.update.message.text)
                .then((res) => {
                  assistantOutput = res;
                  if (assistantOutput.output.intents[0].intent === "absent_welcome" &&
                  assistantOutput.output.entities[0].value==="krank") {
                    mailer.sendMail("melanie@stach24.com")
                        .then((answer)=>{
                          console.log(`answer is ${answer}`);
                          ctx.reply("Gute Besserung! Ich habe ein Mail an alle Dozenten geschickt");
                        })
                        .catch((err)=>{
                          ctx.reply("There has been an error, sorry");
                          console.log(`answer is ${err}`);
                        });
                    if (assistantOutput.output.intents[0].intent === "absent_recommend") {
                      gplaces.getPlaceByText("Apotheke")
                          .then((answer)=>{
                            console.log(`answer is ${answer}`);
                            ctx.reply(answer.results[0].name);
                          })
                          .catch((err)=>{
                            ctx.reply("There has been an error, sorry");
                            console.log(`answer is ${err}`);
                          });
                    }
                  } else if (assistantOutput.output.intents[0].intent === "absent_welcome" &&
                  assistantOutput.output.entities[0].value==="interview") {
                    ctx.reply("Wie lange wirst du nicht in die Uni kommen?");
                  } else if (assistantOutput.output.intents[0].intent === "absent_welcome") {
                    // watsonSpeech.replyWithAudio(ctx, "Warum gehst du nicht in die Uni?");
                    ctx.reply("Warum gehst du nicht in die Uni?");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  ctx.reply("Tut mir leid. Es ist leider ein interner Fehler aufgetreten.");
                });
          })
          .catch((err) => {
            console.log(err);
            ctx.reply("Tut mir leid. Es ist leider ein interner Fehler aufgetreten.");
          });
    }
  };
  this.checkSession = () => {
    return new Promise((resolve, reject)=>{
      if (sessionId) {
        resolve(sessionId);
      } else {
        watsonAssisstant.createSession()
            .then((res) => {
              sessionId=res;
              resolve(sessionId);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
      }
    });
  };
  return this;
};
