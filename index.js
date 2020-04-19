require("dotenv").config();
const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");

const Manager = require("./app/modules/manager/manager");
let mongoUrl = "mongodb://localhost:27017";
if (process.env.PROD) {
  mongoUrl = "mongodb://mongo:27017";
}

mongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, con) => {
  if (err) {
    return console.log(err);
  }
  // MongoDB
  const db = con.db("student_pda");
  console.log("Connected with MongoDB!");

  // Google OAuth2
  const keyPath = path.resolve(__dirname, "gCredentials.json");

  let keys = {redirect_uris: [""]};
  if (fs.existsSync(keyPath)) {
    keys = require(keyPath).web;
  }

  const oAuth2Client = new google.auth.OAuth2(
      keys.client_id,
      keys.client_secret,
      keys.redirect_uris[0],
  );

  google.options({
    auth: oAuth2Client,
  });

  // REST-API
  app.listen(8080, () => {
    console.log("API listening on port 8080!");
  });


  // Manager
  const manager = new Manager();
  const preferences = require("./app/services/preferences/preferences")(db);
  manager.start(preferences, oAuth2Client);

  require("./app/modules/rest/rest.js")(app, preferences, manager.getTelegramBot(), oAuth2Client);
});
