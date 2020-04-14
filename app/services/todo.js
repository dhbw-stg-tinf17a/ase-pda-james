const axios = require("axios");

module.exports = function(preferences) {
  // const preferences = require("../services/preferences")(db);

  this.getTodos = () => {
    return new Promise((resolve, reject)=>{
      preferences.get("ms_todo_token").then((token)=>{
        if (token) {
          preferences.get("ms_todo_folder_id").then((folderId)=>{
            if (folderId) {
              axios.get(`https://outlook.office.com/api/v2.0/me/taskfolders('${folderId}')/tasks`, {
                headers: {"Authorization": `Bearer ${token}`},
              }).then((res)=>{
                const todos = res.data.value;
                todos.sort((a, b)=>{
                  const aDate = new Date(a.DueDateTime.DateTime);
                  const bDate = new Date(b.DueDateTime.DateTime);
                  if (aDate > bDate) {
                    return 1;
                  } else if (aDate < bDate) {
                    return -1;
                  }
                  return 0;
                });
                resolve(todos);
              }).catch((err)=>{
                if (err.response.status == 401) {
                  this.requestRefresh().then(()=>{
                    this.getTodos().then(resolve).catch(reject);
                  }).catch(reject);
                } else {
                  reject(err);
                }
              });
            } else {
              reject(new Error("ms_todo_folder_id is not saved"));
            }
          }).catch((err)=>{
            reject(err);
          });
        } else {
          reject(new Error("ms_todo_token is not saved"));
        }
      }).catch((err)=>{
        reject(err);
      });
    });
  };

  this.deleteTodo = (taskId)=>{
    return new Promise((resolve, reject)=>{
      preferences.get("ms_todo_token").then((token)=>{
        if (token) {
          axios.delete(`https://outlook.office.com/api/v2.0/me/tasks('${
            taskId
          }')`, {
            headers: {"Authorization": `Bearer ${token}`},
          }).then((res)=>{
            resolve();
          }).catch((err)=>{
            if (err.response.status == 401) {
              this.requestRefresh().then(()=>{
                this.deleteTodo(taskId).then(resolve).catch(reject);
              }).catch((err)=>{
                reject(err);
              });
            } else {
              reject(err);
            }
          });
        } else {
          reject(new Error("ms_todo_folder_id is not saved"));
        }
      }).catch((err)=>{
        reject(err);
      });
    });
  };

  this.requestRefresh = ()=>{
    return new Promise((resolve, reject)=>{
      preferences.get("ms_todo_refresh_token").then((rfToken)=>{
        const queryParams = "client_id=" + process.env.MS_TODO_CLIENT_ID +
        "&refresh_token=" + rfToken + "&client_secret=" + process.env.MS_TODO_CLIENT_SECRET +
        "&grant_type=refresh_token";
        axios.post("https://login.microsoftonline.com/common/oauth2/v2.0/token", queryParams,
        ).then((tokenRes)=>{
          const authToken = tokenRes.data.access_token;
          preferences.set("ms_todo_token", authToken).then(()=>{
            preferences.get("chat_id_ms_todo").then((chatId)=>{
              resolve(authToken);
            }).catch((err)=>{
              reject(err);
            });
          }).catch((err)=>{
            reject(err);
          });
        }).catch((err)=>{
          reject(err);
        });
      }).catch((err)=>{
        reject(err);
      });
    });
  };
  this.authorizeUser = (ctx) => {
    preferences.set("chat_id_ms_todo", ctx.chat.id).then(()=>{
      const base = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
      const client = `?client_id=${process.env.MS_TODO_CLIENT_ID}`;
      const scope = "&scope=https%3A%2F%2Foutlook.office.com%2Ftasks.readwrite%20offline_access";
      const responseType = "&response_type=code";
      const redirectUri = `&redirect_uri=${process.env.BACKEND_URL}/mstodo`;
      ctx.reply("Bitte melde dich bei Microsoft Todo an:\n" + base + client + scope + responseType + redirectUri);
    }).catch((err)=>{
      ctx.reply("Tut mir Leid, da hat etwas nicht funktioniert");
      console.error(err);
    });
  };

  this.chooseFolder = (ctx, chatId) => {
    preferences.get("ms_todo_token").then((token)=>{
      axios.get("https://outlook.office.com/api/v2.0/me/taskfolders", {
        headers: {"Authorization": `Bearer ${token}`},
      }).then((res)=>{
        const inlineKeyboardMarkup = {inline_keyboard: [[]]};

        const tasks = res.data.value;
        let i = 0;
        tasks.forEach((task)=>{
          inlineKeyboardMarkup.inline_keyboard[0].push({
            text: task.Name,
            callback_data: "tasks_choosefolder_" + i,
          });
          i++;
        });
        ctx.telegram.sendMessage(chatId, "Bitte wähle das Microsoft Todo Projekt aus, auf das ich ein Auge haben soll",
            {reply_markup: inlineKeyboardMarkup});
      }).catch((err)=>{
        console.error(err);
        ctx.telegram.sendMessage(chatId, "Es gab einen Fehler bei der Auswahl des Microsoft Todo Projekts.");
      });
    }).catch((err)=>{
      console.error(err);
      ctx.telegram.sendMessage(chatId, "Es gab einen Fehler bei der Auswahl des Microsoft Todo Projekts.");
    });
  };

  this.getChosenFolderId = (index) => {
    return new Promise((resolve, reject)=>{
      preferences.get("ms_todo_token").then((token)=>{
        axios.get("https://outlook.office.com/api/v2.0/me/taskfolders", {
          headers: {"Authorization": `Bearer ${token}`},
        }).then((res)=>{
          let i = 0;
          res.data.value.forEach((folder)=>{
            if (i == index) {
              resolve(folder.Id);
            }
            i++;
          });
        }).catch((err)=>{
          reject(err);
        });
      }).catch((err)=>{
        reject(err);
      });
    });
  };
  return this;
};
