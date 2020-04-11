const axios = require("axios");
const gplaces = require("./services/gplaces")();
const todo = require("./services/todo")(db);

module.exports = function(app, db, ctx, oAuth2Client) {
  const preferences = require("./services/preferences")(db);
  app.get("/mstodo", (req, res) => {
    const code = req.query.code;
    const queryParams = "client_id=" + process.env.MS_TODO_CLIENT_ID +
        "&code=" + code + "&client_secret=" + process.env.MS_TODO_CLIENT_SECRET +
        "&grant_type=authorization_code" + "&redirect_uri=http://localhost:8080/mstodo";
    axios.post("https://login.microsoftonline.com/common/oauth2/v2.0/token", queryParams,
    ).then((tokenRes)=>{
      const authToken = tokenRes.data.access_token;
      const refreshToken = tokenRes.data.refresh_token;
      preferences.set("ms_todo_token", authToken).then(()=>{
        preferences.set("ms_todo_refresh_token", refreshToken).then(()=>{
          preferences.get("chat_id_ms_todo").then((chatId)=>{
            res.send("Danke, bitte kehre zurück zu Telegram.");
            todo.chooseFolder(ctx, chatId);
          }).catch((err)=>{
            res.status(500).send("Entschuldige, die authentifizierung über Microsoft hat nicht funktioniert.");
          });
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

  app.get("/oauth2callback", (req, res) => {
    const code = req.query.code;
    oAuth2Client.getToken(code).then((data) => {
      const tokens = data.res.data;
      oAuth2Client.credentials = tokens;

      preferences.set("google_auth_tokens", JSON.stringify(tokens));
    }).then(() => {
      return preferences.get("chat_id_google_auth");
    }).then((chatId) => {
      console.log(chatId);
      res.send("Danke, bitte kehre zu Telegram zurück.");
      ctx.telegram.sendMessage(chatId, "Die Integration mit Google wurde erfolgreich durchgeführt.");

      // mock ctx to trigger use case
      const start = require("./usecases/start.js")(db, oAuth2Client);
      const waRes = {generic: [{text: "start_is_authenticated"}]};
      const mockCtx = {reply: (msg, param)=>ctx.telegram.sendMessage(chatId, msg, param)};
      start.onUpdate(mockCtx, waRes);
    }).catch((err) => {
      if (err) {
        console.error(err);
      }
    });
  });
  app.get("/places", (req, res) => {
    gplaces.getPlaces({location: "52.5200066,13.404954"}).then((result)=> {
      res.send(result);
    },
    ).catch((err)=>res.status(500).send(err));
  });
};
