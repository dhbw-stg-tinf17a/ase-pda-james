
module.exports = function(db, oAuth2Client) {
  const msTodo = require("../services/todo")(db);
  const preferences = require("../services/preferences")(db);
  const cal = require("../services/gcalendar")(db, oAuth2Client);
  const gsearch = require("../services/gsearch");

  this.onUpdate = (ctx, waRes)=>{
    if (waRes.generic[0].text === "tasks_todo_auth") {
      msTodo.authorizeUser(ctx);
    } else if (waRes.generic[0].text === "tasks_show") {
      msTodo.getTodos().then((todos)=>{
        // show tasks to user
        let inlineKeyboardMarkup = {inline_keyboard: [[]]};
        let toSend = "Du hast folgende Aufgaben offen:\n";
        if (todos.length != 0) {
          todos.forEach((todo, i)=>{
            toSend += `- ${todo.Subject}\n`;
          });

          cal.getFreeSlots("primary").then((calRes)=>{
            const space = calRes[0][0];
            space.start = new Date(space.start);
            space.end = new Date(space.end);

            toSend += "\n" +
            `Ich empfehle dir, dass du mit ${todos[0].Subject} beginnst, es ist am frühsten fällig :)\n`;
            toSend += `Du hast von ${space.start.toLocaleString([], {hour: "2-digit", minute: "2-digit"})} bis`+
            ` ${space.end.toLocaleString([], {hour: "2-digit", minute: "2-digit"})} Zeit dafür.\n`;
            toSend += "Gib mir Bescheid, wenn du die Aufgabe erledigt hast oder abbrichst:";

            inlineKeyboardMarkup = {inline_keyboard: [[{
              text: "Erledigt",
              callback_data: "tasks_exercise_done",
            }], [{
              text: "Braucht noch Zeit",
              callback_data: "tasks_exercise_notdone",
            }]]};

            preferences.set("ms_task_id", todos[0].Id).catch((err)=>{
              console.error(err);
              ctx.reply("Tut mir Leid, es gab einen Fehler mit den Preferences.");
            });
            gsearch.getSearchResults(todos[0].Subject).then((searchRes)=>{
              toSend += "\n\nHier sind einige Links die dir bei deiner Aufgabe helfen könnten:\n\n";
              ctx.reply(toSend, {reply_markup: inlineKeyboardMarkup});

              setTimeout(()=>{
                searchRes.split("\n\n").forEach((singleSearchRes)=>{
                  ctx.reply(singleSearchRes);
                });
              }, 1000);
            }).catch((err)=>{
              console.error(err);
              ctx.reply("Tut mir Leid, es gab einen Fehler mit Google Search.");
            });
          }).catch((err)=>{
            console.error(err);
          });
        } else {
          toSend = "Du hast im Moment keine Aufgaben in deiner ToDo Liste 🔥";
          ctx.reply(toSend, {reply_markup: inlineKeyboardMarkup});
        }
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
    const data = ctx.callbackQuery.data.substr("tasks_".length);

    const type = data.split("_")[0];
    const details = data.split("_")[1];
    switch (type) {
      case "choosefolder":
        if (details) {
          msTodo.getChosenFolderId(details).then((folderId)=>{
            preferences.set("ms_todo_folder_id", folderId).then(()=>{
              ctx.editMessageReplyMarkup({inline_keyboard: [[]]});
              ctx.reply("Sehr schön, dann sind wir fertig mit der Microsoft Todo Einrichtung 🙌 " +
              "Ab jetzt kannst du mich immer Fragen welche Aufgaben du noch machen musst.");
            }).catch((err)=>{
              console.error(err);
              ctx.reply("Ein Fehler ist aufgetreten.");
            });
          }).catch((err)=>{
            console.error(err);
            ctx.reply("Ein Fehler ist aufgetreten.");
          });
        }
        break;
      case "exercise":
        if (details=="done") {
          preferences.get("ms_task_id").then((taskId)=>{
            msTodo.deleteTodo(taskId).then(()=>{
              ctx.reply("Super! Ich habe die Aufgabe aus deiner ToDo Liste entfernt ✅");
            }).catch((err)=>{
              console.error(err);
              ctx.reply("Tut mir Leid, es gab einen Fehler mit den der MS ToDo API.");
              console.log(taskId);
            });
          }).catch((err)=>{
            console.error(err);
            ctx.reply("Tut mir Leid, es gab einen Fehler mit den Preferences.");
          });
          // msTodo.deleteTodo
        } else {
          ctx.reply("Okay :) Ich lasse die Aufgabe also erstmal in der ToDo Liste stehen");
        }
        ctx.editMessageReplyMarkup({inline_keyboard: [[]]});
        break;
    }
  };
  return this;
};
