const AssistantV2 = require("ibm-watson/assistant/v2");
const {IamAuthenticator} = require("ibm-watson/auth");
let sessionId;
const assistant = new AssistantV2({
  version: "2019-02-28",
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_ASSISSTANT_KEY,
  }),
  url: "https://api.eu-de.assistant.watson.cloud.ibm.com/instances/0a89d17c-0872-409f-bf4d-8dca04742177",
});
module.exports = function() {
  this.sendInput = (userInput)=>{
    return new Promise((resolve, reject)=>{
      if (!sessionId) {
        this.createSession()
            .then(() => {
              this.message(userInput)
                  .then((res) => {
                    resolve(res);
                  })
                  .catch((err) => {
                    reject(err);
                  });
            })
            .catch((err) => {
              reject(err);
            });
      } else {
        this.message(userInput)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              if (err.message === "Invalid Session") {
                this.createSession()
                    .then(() => {
                      this.message(userInput)
                          .then((res) => {
                            resolve(res);
                          })
                          .catch((err) => {
                            reject(err);
                          });
                    })
                    .catch((err) => {
                      reject(err);
                    });
              }
            });
      }
    });
  };


  this.createSession = ()=>{
    return new Promise((resolve, reject)=>{
      assistant.createSession({
        assistantId: process.env.WATSON_ASSISSTANT_ID,
      })
          .then((res) => {
            sessionId = res.result.session_id;
            resolve("success");
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  };
  this.message = (userInput)=>{
    return new Promise((resolve, reject)=>{
      assistant.message({
        assistantId: process.env.WATSON_ASSISSTANT_ID,
        sessionId: sessionId,
        input: {
          "message_type": "text",
          "text": userInput,
        },
      })
          .then((res) => {
            resolve(res.result.output);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  };
  this.deleteSession = ()=>{
    return new Promise((resolve, reject)=>{
      assistant.deleteSession({
        assistantId: process.env.WATSON_ASSISSTANT_KEY,
        sessionId: sessionId,
      })
          .then((res) => {
            sessionId="";
            resolve("success");
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  };
  return this;
};
