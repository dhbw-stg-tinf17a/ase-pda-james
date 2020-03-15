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
        assistantId: process.env.WATSON_ASSISSTANT_ID,
      })
          .then((res) => {
            console.log(JSON.stringify(res, null, 2));
            resolve(res.result.session_id);
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
        assistantId: process.env.WATSON_ASSISSTANT_KEY,
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
        assistantId: process.env.WATSON_ASSISSTANT_ID,
        sessionId: sessionId,
        input: {
          "message_type": "text",
          "text": userInput,
        },
      })
          .then((res) => {
            console.log(JSON.stringify(res.result.output, null, 2));
            resolve(res.result.output);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  };
  return this;
};
