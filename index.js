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
    usecases.push(require("./app/usecases/books.js")().onUpdate);
    usecases.push(require("./app/usecases/meals.js")().onUpdate);
    bot.startPolling();

    require("./app/rest.js")(app, db, bot);

    // give every usecase a chance to say something
    bot.use((ctx) => {
      usecases.forEach((usecase) => {
        usecase(ctx);
      });
    });
  }
});
