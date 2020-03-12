const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const {IamAuthenticator} = require("ibm-watson/auth");
const fs = require("fs");

module.exports = () => {
  this.t2s = (text) => {
    return new Promise((resolve, reject) => {
      const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.WATSON_T2S,
        }),
        url: "https://api.eu-de.text-to-speech.watson.cloud.ibm.com/instances/82ee9d6c-387d-4215-893c-30e1920eb53c",
      });
      const synthesizeParams = {
        text,
        accept: "audio/mp3",
        voice: "en-US_AllisonVoice",
      };
      textToSpeech.synthesize(synthesizeParams).then((response) => {
        const audioStream = response.result;
        resolve(audioStream);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  };
  this.replyWithAudio = (ctx, text) => {
    this.t2s(text).then((audioStream) => {
      ctx.replyWithAudio({source: audioStream}).catch((err) => {
        console.error(err);
      });
    }).catch((err) => {
      console.error(err);
      ctx.reply("there has been an error smh");
    });
  };
  return this;
};
