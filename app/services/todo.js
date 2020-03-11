module.exports = function(db) {
  const preferences = require("../services/preferences")(db);

  this.getTodoList = () => {
    return new Promise((resolve, reject)=>{
      // implement API calls
      resolve("not implemented");
    });
  };
  this.authorizeUser = (ctx) => {
    preferences.set("chat_id_ms_todo", ctx.chat.id).then(()=>{
      const base = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
      const client = `?client_id=${process.env.MS_TODO_CLIENT_ID}`;
      const scope = "&scope=user.read%20";
      const responseType = "&response_type=code";
      const redirectUri = "&redirect_uri=http://localhost:8080/mstodo";
      ctx.reply(base + client + scope + responseType + redirectUri);
    }).catch((err)=>{
      ctx.reply("Tut mir Leid, da hat etwas nicht funktioniert");
      console.error(err);
    });
  };
  return this;
};
