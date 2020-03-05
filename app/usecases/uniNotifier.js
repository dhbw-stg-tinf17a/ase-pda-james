const vvs = require('../services/vvs')()

module.exports = function() {
  this.onUpdate = (ctx)=>{
    if (ctx.update.message.text == "vvs") {
      vvs.getStopId("Hulb").then((res) => {
        console.log("Stop Names and IDs:\n" + res)
        ctx.reply("Which station do you mean?\n")
        res.forEach((stop) => {
          ctx.reply(stop.stopName + " (" + stop.stopId + ")")
        })
      }).catch((err) => {
        console.log(err)
        ctx.reply("An error occurred.")
      }
    )}
  };
  return this;
};
