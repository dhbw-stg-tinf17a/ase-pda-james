const AssistantV2 = require("ibm-watson/assistant/v2");
const {IamAuthenticator} = require("ibm-watson/auth");
const assistant = new AssistantV2({
  version: "2019-02-28",
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_ASSISSTANT_KEY,
  }),
  url: "https://api.eu-de.assistant.watson.cloud.ibm.com/instances/0a89d17c-0872-409f-bf4d-8dca04742177",
});
module.exports = function() {
  let sessionId;
  this.sendInput = (userInput)=>{
    return new Promise((resolve, reject)=>{
      if (!this.sessionId) {
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
            this.sessionId = res.result.session_id;
            resolve("success");
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
    });
  };
  this.message = (userInput)=>{
    return new Promise((resolve, reject)=>{
      assistant.message({
        "assistantId": process.env.WATSON_ASSISSTANT_ID,
        "sessionId": this.sessionId,
        "input": {
          "message_type": "text",
          "text": userInput,
          "options": {
            "return_context": true,
          },
        },
      },
      )
          .then((res) => {
            res.result.output.context= res.result.context.skills["main skill"].user_defined;
            resolve(res.result.output);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
    });
  };
  this.deleteSession = ()=>{
    return new Promise((resolve, reject)=>{
      assistant.deleteSession({
        assistantId: process.env.WATSON_ASSISSTANT_KEY,
        sessionId: this.sessionId,
      })
          .then((res) => {
            this.sessionId="";
            resolve("success");
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
    });
  };
  return this;
};
