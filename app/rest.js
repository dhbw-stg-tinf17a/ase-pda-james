const axios = require("axios");

module.exports = function(app, db, ctx) {
  const preferences = require("./services/preferences")(db);

  app.get("/mstodo", (req, res)=>{
    const code = req.query.code;
    const queryParams = "client_id=" + process.env.MS_TODO_CLIENT_ID +
        "&code=" + code + "&client_secret=" + process.env.MS_TODO_CLIENT_SECRET +
        "&grant_type=authorization_code" + "&redirect_uri=http://localhost:8080/mstodo";
    axios.post("https://login.microsoftonline.com/common/oauth2/v2.0/token", queryParams,
    ).then((tokenRes)=>{
      const authToken = tokenRes.data.access_token;
      preferences.set("ms_todo_token", authToken).then(()=>{
        preferences.get("chat_id_ms_todo").then((chatId)=>{
          res.send("Danke, bitte kehre zurück zu Telegram.");
          ctx.telegram.sendMessage(chatId, "Die Integration mit Microsoft Todo wurde erfolgreich durchgeführt.");
        }).catch((err)=>{
          res.status(500).send("Entschuldige, die authentifizierung über Microsoft hat nicht funktioniert.");
        });
      }).catch((err)=>{
        console.error(err);
        res.status(500).send("Entschuldige, die authentifizierung über Microsoft hat nicht funktioniert.");
      });
    }).catch((err)=>{
      console.error(err);
      res.status(500).send("Entschuldige, die authentifizierung über Microsoft hat nicht funktioniert.");
    });
  });
};
