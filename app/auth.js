const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
// const pc = require("joi-password-complexity"); TODO: Fix dependencies
const joiSchema = require("../validation/joi-schemas.js");


// helper function that generates a random token
function generateToken(length) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let index;
  let token = "";
  for (let i = 0; i < length; i++) {
    index = Math.floor(Math.random() * 62);
    token = token + alphabet[index];
  }
  return token;
}

module.exports = function(app, db) {
  // Executes promise() when request is authenticated and authorized.
  // Handles the request otherwise.
  this.handleAuth = function(req, res, promise) {
    const auth = {
      "authToken": req.header("authToken"),
      "email": req.header("email"),
    };

    Joi.validate(auth, joiSchema.schemaAuth, (err, value) => {
      if (err) {
        res.status(401);
        res.send(`authorization failed: ${err.message}`);
      } else {
        auth["auth.token"] = auth.authToken;
        delete auth.authToken;
        auth.email = auth.email.toLowerCase();

        db.collection("users").findOne(auth, (err, user) => {
          if (err) {
            res.status(500);
            res.send("internal server error");
          } else if (user) {
            promise(user.email);
          } else {
            res.status(401);
            res.send("unauthorized");
          }
        });
      }
    });
  };

  this.handleDbError = function(res, err, onNoError) {
    if (err) {
      res.status(500);
      res.send("internal server error");
      console.error(err);
    } else {
      onNoError();
    }
  };

  // will handle the /login requests
  // create token and manage the state of authentification
  app.post("/users/login", (req, res)=>{
    Joi.validate(req.body, joiSchema.schemaLogin, function(err, value) {
      if (err) {
        res.status(400);
        res.send(`bad request: ${err.message}`);
      } else {
        // get salt of the user
        req.body.email = req.body.email.toLowerCase();

        db.collection("users").findOne({"email": req.body.email}, (err, user)=>{
          if (err) {
            res.status(500);
            res.send(err);
          } else if (user==undefined) {
            res.status(401);
            res.send("unauthorized");
          } else {
            // make hash from salt+password and check password
            req.body.password = bcrypt.hashSync(req.body.password, user.salt);
            if (req.body.password == user.password) {
              if (user.auth && user.auth.expires >= Date.now()) { // if valid token is existant
                res.send({"token": user.auth.token});
              } else { // else generate new token
                const token = {
                  "token": generateToken(128),
                  "expires": Date.now() + (14 * 1000 * 60 * 60 * 24),
                };

                db.collection("users").updateOne({"email": user.email}, {$set: {"auth": token}}, (err) =>{
                  handleDbError(res, err, ()=>{
                    res.send({"token": token.token});
                  });
                });
              }
            } else {
              res.status(401);
              res.send("unauthorized");
            }
          }
        });
      }
    });
  });

  app.post("/users/register", (req, res)=>{
    Joi.validate(req.body, joiSchema.schemaUserRegister, function(err, value) {
      if (err) {
        res.status(400);
        res.send(err.message);
      } else {
        req.body.email = req.body.email.toLowerCase();

        db.collection("users").findOne({"email": req.body.email}, (err, user) => {
          if (err) {
            res.status(500);
            res.send(err);
          } else if (user != undefined) {
            res.status(409);
            res.send("email already registered");
          } else {
            req.body.salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, req.body.salt);
            db.collection("users").insertOne(req.body, (err)=>{
              if (!err) {
                res.send("success");
              } else {
                res.status(500);
                res.send("internal server error: " + err);
              }
            });
          }
        });
      }
    });
  });

  return this;
};
