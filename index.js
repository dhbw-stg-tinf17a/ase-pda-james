require("dotenv").config();
const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const path = require("path");
const {google} = require("googleapis");
const fs = require("fs");

const Manager = require("./app/Manager");

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


    // Manager
    const manager = new Manager(db);
    manager.start(oAuth2Client);

    require("./app/rest.js")(app, db, manager.getTelegramBot(), oAuth2Client);
  }
});
