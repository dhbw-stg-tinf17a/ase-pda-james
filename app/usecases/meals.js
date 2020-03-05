const gmaps = require("../services/gmaps");

module.exports = () => {
  this.onUpdate = (ctx) => {
    if (ctx.update.message.text === "meals") {
      ctx.reply("Directions");

      gmaps.getDirections("Stuttgart DHBW Rotebühlplatz", "Gerber Stuttgart")
          .then((data) => {
            console.log("return from getDirections", data);
            ctx.reply(data);
          });
    }
  };
  return this;
};
