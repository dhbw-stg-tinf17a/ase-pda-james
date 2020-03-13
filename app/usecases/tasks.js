const msTodo = require("../services/todo")();

module.exports = function() {
  const preferences = require("../services/preferences")(db);

  this.onUpdate = (ctx)=>{
    if (ctx.update.message && ctx.update.message.text === "todo-auth") {
      msTodo.authorizeUser(ctx);
    } else if (ctx.update.message && ctx.update.message.text === "todos") {
      msTodo.getTodos().then((todos)=>{
        let toSend = "Du hast folgende Aufgaben offen:\n";
        if (todos.length != 0) {
          todos.forEach((todo)=>{
            toSend += `- ${todo.Subject}\n`;
          });
        }
        ctx.reply(toSend);
      }).catch((err)=>{
        console.error(err);
      });
    } else if (ctx.updateType == "callback_query") {
      msTodo.getChosenFolderId(ctx.callbackQuery.data).then((folderId)=>{
        preferences.set("ms_todo_folder_id", folderId).then(()=>{
          ctx.reply("Sehr schön, dann sind wir fertig mit der Microsoft Todo Einrichtung 🙌");
        }).catch((err)=>{
          console.error(err);
          ctx.reply("Ein Fehler ist aufgetreten.");
        });
      }).catch((err)=>{
        console.error(err);
        ctx.reply("Ein Fehler ist aufgetreten.");
      });
    }
  };
  return this;
};
