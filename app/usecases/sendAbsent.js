const gplaces = require("../services/gplaces")();
const mailer = require("../services/mailer")();
const watsonSpeech = require("../services/watsonSpeech")();
const watsonAssisstant = require("../services/watsonAssistant")();
let sessionId;
let absentTime;
let absentReason;

module.exports = function() {
  this.onUpdate = (ctx, waRes)=>{
    if (waRes.generic[0].text === "absent_welcome") {
      watsonSpeech.replyWithAudio(ctx, "Warum gehst du nicht in die Uni?");
    } else if (waRes.generic[0].text === "absent_reason_else") {
      ctx.reply("Wie lange wirst du nicht in die Uni kommen?");
    } else if (waRes.generic[0].text === "absent_time") {
      ctx.reply("Ok");
      mailer.sendMail("jamesaseprojekt@gmail.com")
          .then((answer)=>{
            console.log(`answer is ${answer}`);
            ctx.reply("Ich habe nun ein Mail an das Sekretariat geschickt. Viel Erfolg");
          })
          .catch((err)=>{
            ctx.reply("There has been an error, sorry");
            console.log(`answer is ${err}`);
          });
    } else if (waRes.generic[0].text === "absent_reason_sick") {
      ctx.reply("Das tut mir leid. Gute Besserung");
      mailer.sendMail("jamesaseprojekt@gmail.com")
          .then((answer)=>{
            console.log(`answer is ${answer}`);
            ctx.reply("Ich habe nun eine Mail an das Sektretariat geschickt");
          })
          .catch((err)=>{
            ctx.reply("There has been an error, sorry");
            console.log(`answer is ${err}`);
          });

      gplaces.getPlacesByText("Apotheke")
          .then((answer)=>{
            console.log(`answer is ${answer}`);
            ctx.reply("Wenn du Medizin brauchst kannst du zu diesen Apotheken in deiner Nähe gehen" +
                          answer.results[0].name);
          })
          .catch((err)=>{
            ctx.reply("There has been an error, sorry");
            console.log(`answer is ${err}`);
          });
    }
  };
  return this;
};
