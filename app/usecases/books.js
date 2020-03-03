const gplaces = require("../services/gplaces")();

module.exports = function() {
  this.onUpdate = (ctx)=>{
    if (ctx.update.message.text == "books") {
      ctx.reply("I am the books service");
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
