const msTodo = require("../services/todo")();

module.exports = function() {
  this.onUpdate = (ctx)=>{
    if (ctx.update.message.text === "todo-auth") {
      msTodo.authorizeUser(ctx);
    }
  };
  return this;
};
