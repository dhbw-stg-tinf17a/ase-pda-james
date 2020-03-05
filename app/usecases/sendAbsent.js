const gplaces = require("../services/gplaces")();
const mailer = require("../services/mailer")();

module.exports = function() {
  this.onUpdate = (ctx)=>{
    if (ctx.update.message.text == "sick") {
      mailer.sendMail("melanie@stach24.com").then((answer)=>{
        console.log(`answer is ${answer}`);
        ctx.reply(answer);
      }).catch((err)=>{
        ctx.reply("There has been an error, sorry");
        console.log(`answer is ${err}`);
      });
      gplaces.getPlaceByText("Apotheke").then((answer)=>{
        console.log(`answer is ${answer}`);
        ctx.reply(answer.results[0].name);
      }).catch((err)=>{
        ctx.reply("There has been an error, sorry");
        console.log(`answer is ${err}`);
      });
    }
  };
  return this;
};
