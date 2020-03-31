const msTodo = require("../services/todo")();

module.exports = function() {
  const preferences = require("../services/preferences")(db);

  this.onUpdate = (ctx, waRes)=>{
    if (waRes.generic[0].text === "tasks_todo_auth") {
      msTodo.authorizeUser(ctx);
    } else if (waRes.generic[0].text === "tasks_show") {
      msTodo.getTodos().then((todos)=>{
        let toSend = "Du hast folgende Aufgaben offen:\n";
        if (todos.length != 0) {
          todos.forEach((todo)=>{
            toSend += `- ${todo.Subject}\n`;
          });
        }
        ctx.reply(toSend);
      }).catch((err)=>{
        if (err.message=="ms_todo_token is not saved") {
          msTodo.authorizeUser(ctx);
        } else if (err.message=="ms_todo_folder_id is not saved") {
          msTodo.chooseFolder(ctx, ctx.message.chat.id);
        } else {
          console.error(err);
        }
      });
    }
  };

  this.onCallbackQuery = (ctx)=>{
    const data = ctx.callbackQuery.data.split("_")[1];

    msTodo.getChosenFolderId(data).then((folderId)=>{
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
  };
  return this;
};
