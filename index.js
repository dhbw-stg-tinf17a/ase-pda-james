const {google} = require("googleapis");
const path = require("path");
const fs = require("fs");

const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const Telegraf = require("telegraf");
require("dotenv").config();

let connection = undefined;
// const mongoUrl = "mongodb://localhost:27017";
const mongoUrl = "mongodb://localhost:27017";


mongoClient.connect(mongoUrl, {useNewUrlParser: true}, function(err, con) {
  if (err) {
    console.log(err);
  } else {
    // MongoDB
    db = con.db("student_pda");
    connection = con;
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
    app.listen(8080, function() {
      console.log("API listening on port 8080!");
    });

    // TELEGRAM
    const bot = new Telegraf(process.env.BOT_TOKEN);
    const usecases = [];
    usecases.push(require("./app/usecases/uniNotifier.js")().onUpdate);
    usecases.push(require("./app/usecases/tasks.js")(db).onUpdate);
    usecases.push(require("./app/usecases/sendAbsent.js")().onUpdate);
    usecases.push(require("./app/usecases/books.js")(db, oAuth2Client).onUpdate);
    usecases.push(require("./app/usecases/meals.js")().onUpdate);
    bot.startPolling();

    require("./app/rest.js")(app, db, bot, oAuth2Client);

    // give every usecase a chance to say something
    bot.use((ctx) => {
      usecases.forEach((usecase) => {
        usecase(ctx);
      });
    });
  }
});
