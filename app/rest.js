const axios = require("axios");

module.exports = function(app, db) {
  app.get("/mstodo", (req, res)=>{
    const code = req.query.code;
    const queryParams = "client_id=" + process.env.MS_TODO_CLIENT_ID +
        "&code=" + code + "&client_secret=" + process.env.MS_TODO_CLIENT_SECRET +
        "&grant_type=authorization_code" + "&redirect_uri=http://localhost:8080/mstodo";
    axios.post("https://login.microsoftonline.com/common/oauth2/v2.0/token", queryParams,
    ).then((res)=>{
      const authToken = res.data.access_token;
    }).catch((err)=>{
      console.log(err.response);
    });
    res.send("Danke, bitte kehre zurück zu Telegram.");
  });
};
