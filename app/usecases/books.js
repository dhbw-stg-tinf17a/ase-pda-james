const gplaces = require("../services/gplaces")();
const watsonSpeech = require("../services/watsonSpeech")();

module.exports = function() {
  this.onUpdate = (ctx)=>{
    if (ctx.update.message.text == "books") {
      watsonSpeech.replyWithAudio(ctx, "Hello");
    } else if (ctx.update.message.text == "places") {
      gplaces.getPlaceById(3).then((answer)=>{
        console.log(`answer is ${answer}`);
        ctx.reply(answer);
      }).catch((err)=>{
        ctx.reply("There has been an error, sorry");
      });
    }
  };
  return this;
};
