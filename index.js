const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const router = new express.Router();
const cors = require("cors");
require("dotenv").config();

let connection = undefined;
// const mongoUrl = "mongodb://localhost:27017";
const mongoUrl = "mongodb://localhost:27017";

// "plugins" for express
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({extended: true}));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// import necessary modules

mongoClient.connect(mongoUrl, {useNewUrlParser: true}, function(err, con) {
  if (err) {
    console.log(err);
  } else {
    db = con.db("survey");
    connection = con;
    console.log("Connected with MongoDB!");

    const authManager = require("./app/auth.js")(app, db);
    // require("./app/restExample.js")(app, authManager, db);

    app.listen(8080, function() {
      console.log("API listening on port 8080!");
    });
  }
});
