module.exports = function() {
  this.onUpdate = (ctx, message)=>{
    ctx.reply(message);
  };
  return this;
};
