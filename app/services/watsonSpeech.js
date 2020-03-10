const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const {IamAuthenticator} = require("ibm-watson/auth");
const fs = require("fs");
const axios = require("axios");

module.exports = function() {
  // returns a promise that resolves to an audio stream
  this.t2s = (text)=>{
    return new Promise((resolve, reject)=>{
      const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.WATSON_T2S,
        }),
        url: "https://api.eu-de.text-to-speech.watson.cloud.ibm.com/instances/82ee9d6c-387d-4215-893c-30e1920eb53c",
      });
      const synthesizeParams = {
        text,
        accept: "audio/mp3",
        voice: "de-DE_DieterV3Voice",
      };
      textToSpeech.synthesize(synthesizeParams).then((response)=>{
        const audioStream = response.result;
        resolve(audioStream);
      }).catch((err)=>{
        console.error(err);
        reject(err);
      });
    });
  };

  // answers to a given context with spoken language
  this.replyWithAudio = (ctx, text) => {
    this.t2s(text).then((audioStream)=>{
      ctx.replyWithAudio({source: audioStream}).catch((err)=>{
        console.error(err);
      });
    }).catch((err)=>{
      console.error(err);
      ctx.reply("there has been an error with text to speech");
    });
  };

  // returns a promise that resolves to a text
  this.s2t = (ctx)=>{
    return new Promise((resolve, reject)=>{
      const speechToText = new SpeechToTextV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.WATSON_S2T,
        }),
        url: "https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/55f33aba-9e0b-49e0-84f8-b43e0ed1e958",
      });

      const params = {
        objectMode: false,
        contentType: "audio/ogg",
        model: "de-DE_BroadbandModel",
      };

      ctx.telegram.getFileLink({file_id: ctx.message.voice.file_id})
          .then((link) => {
            const recognizeStream = speechToText.recognizeUsingWebSocket(params);
            axios.get(link, {responseType: "stream"}).then((res)=>{
              res.data.pipe(recognizeStream);
            }).catch((err)=>{
              console.error(err);
            });

            recognizeStream.on("data", function(event) {
              resolve(event.toString());
            });
            recognizeStream.on("error", function(event) {
              console.error(event);
            });
          }).catch((err)=>{
            console.error(err);
          });
    });
  };
  return this;
};
