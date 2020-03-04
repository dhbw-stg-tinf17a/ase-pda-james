const gplaces = require("../services/gplaces")();
const library = require('../services/library')();

module.exports = function() {
  this.onUpdate = (ctx)=>{
    if (ctx.update.message.text === "books") {
      library.getByTitle('user experience')
        .then(res => {
          const data = res.data;

          const collatedTitles = data.records.map(record => record.title).join(', ');

          const message = `The first ten articles are: ${collatedTitles}`;

          ctx.reply(message);
        })
        .catch(err => {
          ctx.reply("There has been an error, sorry");
        });
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
