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
  this.createSession = ()=>{
    return new Promise((resolve, reject)=>{
      assistant.createSession({
        assistantId: "16509501-c2cd-4d5c-87f8-30e678c34968",
      })
          .then((res) => {
            console.log(JSON.stringify(res, null, 2));
            resolve(res.result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  };
  this.deleteSession = (sessionId)=>{
    return new Promise((resolve, reject)=>{
      assistant.deleteSession({
        assistantId: "16509501-c2cd-4d5c-87f8-30e678c34968",
        sessionId: sessionId,
      })
          .then((res) => {
            console.log(JSON.stringify(res, null, 2));
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  };
  this.sendInput = (sessionId, userInput)=>{
    return new Promise((resolve, reject)=>{
      assistant.message({
        assistantId: "16509501-c2cd-4d5c-87f8-30e678c34968",
        sessionId: sessionId,
        input: {
          "message_type": "text",
          "text": userInput,
        },
      })
          .then((res) => {
            console.log(JSON.stringify(res, null, 2));
            resolve(res.result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  };
  return this;
};
