const gplaces = require("../services/gplaces")();
const mailer = require("../services/mailer")();
const gcalendar = require("../services/gcalendar")();
const watsonSpeech = require("../services/watsonSpeech")();
const lectureCalId="upc9dbk6vkpt60dbfnoqvmevs9h1d9k0";

let startAbsent;
let endAbsent;

let startAbsentDayFound;
let startAbsentTimeIndex;
let endAbsentTimeIndex;


module.exports = () => {
  this.onUpdate = (ctx, waRes)=>{
    switch (waRes.generic[0].text) {
      case "absent_welcome":
        watsonSpeech.replyWithAudio(ctx, "Warum gehst du nicht in die Uni?");
        break;
      case "absent_reason_else":
        ctx.reply("Wie lange wirst du nicht in die Uni kommen?");
        break;
      case "absent_time":
        ctx.reply("Ok");
        this.convertEntityDates(waRes);
        gcalendar.getBusySlotsByCalendarId(startAbsent, endAbsent, lectureCalId)
            .then((res) => {
              if (res.length === 0) {
                ctx.reply("Du hast zu dieser Zeit keine Uni. Aber ich wünsche dir viel Erfolg");
              } else {
                mailer.sendMail("jamesaseprojekt@gmail.com")
                    .then((answer)=>{
                      ctx.reply("Ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
                    })
                    .catch((err)=>{
                      ctx.reply("There has been an error, sorry");
                    });
              }
            })
            .catch((err) => {
              mailer.sendMail("jamesaseprojekt@gmail.com")
                  .then((answer)=>{
                    ctx.reply("Ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
                  })
                  .catch((err)=>{
                    ctx.reply("There has been an error, sorry");
                  });
            });
        startAbsent=null;
        endAbsent=null;
        startAbsentDayFound=null;
        startAbsentTimeIndex=null;
        endAbsentTimeIndex=null;
        break;
      case "absent_reason_sick":
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

        gplaces.getPlaces({
          query: "Apotheke",
        })
            .then((answer)=>{
              console.log(`answer is ${answer}`);
              ctx.reply("Wenn du Medizin brauchst kannst du zu diesen Apotheken in deiner Nähe gehen" +
                                answer.results[0].name);
            })
            .catch((err)=>{
              ctx.reply("There has been an error, sorry");
              console.log(`answer is ${err}`);
            });
        break;
    }
  };
  this.convertEntityDates = (waRes) => {
    waRes.entities.forEach((entity, index) => {
      if (entity.entity === "sys-date" && !startAbsentDayFound ) {
        startAbsent = entity.value;
        startAbsentDayFound = true;
      } else if (entity.entity === "sys-date") {
        endAbsent = entity.value;
      } else if (entity.entity === "sys-time" && !startAbsentTimeIndex) {
        startAbsentTimeIndex = index;
      } else if (entity.entity === "sys-time") {
        endAbsentTimeIndex = index;
      }
    });
    if (!startAbsent) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      startAbsent = yyyy + "-" + mm + "-" + dd;
      endAbsent = startAbsent;
    }
    if (!endAbsent) {
      endAbsent = startAbsent;
    }
    startAbsent = startAbsent + "T" + waRes.entities[startAbsentTimeIndex].value;
    endAbsent = endAbsent + "T" + waRes.entities[endAbsentTimeIndex].value;
  };
  this.onCallbackQuery = (ctx) => {

  };
  return this;
};
