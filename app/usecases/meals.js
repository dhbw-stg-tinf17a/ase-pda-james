const gmaps = require("../services/gmaps");
const gsearch = require("../services/gsearch");

module.exports = () => {
  this.onUpdate = (ctx) => {
    if (ctx.update.message.text === "search") {
      gsearch.getSearchResults("Apotheke Rothebühlplatz")
          .then((data) => {
            console.log("return from getSearchResults", data);
            ctx.reply(data);
          });
    }
    if (ctx.update.message.text === "meals") {
      ctx.reply("Directions");

      gmaps.getDirections("Stuttgart DHBW Rotebühlplatz", "Gerber Stuttgart")
          .then((data) => {
            console.log("return from getDirections", data);
            ctx.reply(data);
          });
      ctx.reply(gmaps.getGoogleMapsRedirectionURL("Stuttgart DHBW Rotebühlplatz"));
    }
  };
  return this;
};
