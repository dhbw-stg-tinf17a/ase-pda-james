const library = require('../services/springer')();

module.exports = function () {
  this.onUpdate = (ctx) => {
    if (ctx.update.message.text === "books") {
      library.getByTitle('user experience')
        .then(res => {
          const data = res.data;

          const collatedTitles = data.records.slice(5).map(record => record.title).join('\n');

          const message = `<b>The first five articles are:</b> ${ '\n' + collatedTitles }`;

          ctx.replyWithHTML(message);
        })
        .catch(() => {
          ctx.reply("There has been an error, sorry");
        });
    }
  };
  return this;
};
