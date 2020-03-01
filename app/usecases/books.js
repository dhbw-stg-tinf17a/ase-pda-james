module.exports = function() {
  this.onUpdate = (ctx)=>{
    if (ctx.update.message.text == "books") {
      ctx.reply("I am the books service");
    }
  };
  return this;
};
