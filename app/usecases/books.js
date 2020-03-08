const library = require("../services/springer");
const calendar = require("../services/gcalendar")();

module.exports = function() {
  this.onUpdate = (ctx) => {
    if (ctx.update.message.text === "books") {
      library.getByTitle().then((res) => {
        const data = res.data;

        const collatedTitles = data.records.slice(5).map((record) => record.title).join("\n");

        const message = `<b>The first five articles are:</b> ${ "\n" + collatedTitles }`;

        ctx.reply("You searched for \"user experience\".").then(() => {
          ctx.replyWithHTML(message);
        });
      }).catch(() => {
        ctx.reply("There has been an error, sorry");
      });
    } else if (ctx.update.message.text === "books event") {
      calendar.getNextEvent().then((res) => {
        ctx.reply(JSON.stringify(res));
      });
    }
  };
  return this;
};
