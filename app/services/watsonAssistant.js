const AssistantV2 = require("ibm-watson/assistant/v2");
const {IamAuthenticator} = require("ibm-watson/auth");
let sessionId= "af11c111-860d-4071-b6d2-550bf20c016e";
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
            sessionId = res.result.session_id;
            resolve("success");
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
            // console.log(JSON.stringify(res, null, 2));
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  };
  this.sendInput = (userInput)=>{
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
            console.log("ERFOLG");

            resolve(res.result.output);
          })
          .catch((err) => {
            console.log("Test0");
            console.log(err);
            if (err.message === "Invalid Session") {
              console.log("Test");
              console.log(sessionId);
              this.createSession().then(() => {
                console.log(sessionId);
                console.log("Test1");
                watsonAssisstant.sendInput(userInput)
                    .then((res) => {
                      console.log("ERFOLG");

                      resolve(res.result.output);
                    })
                    .catch((err) => {
                      console.log("ERRROORO");
                      reject(err);
                    });
              }).catch((err) => {
                console.log("Test2");
                console.log(err);
                reject(err);
              });
            }
          });
    });
  };
  return this;
};
