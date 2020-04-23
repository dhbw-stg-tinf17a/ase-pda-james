const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const axios = require("axios");

module.exports = function () {
  // returns a promise that resolves to an audio stream
  this.t2s = (text) => {
    return new Promise((resolve, reject) => {
      const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.WATSON_T2S,
        }),
        url: process.env.WATSON_T2S_URL,
      });
      const synthesizeParams = {
        text,
        accept: "audio/mp3",
        voice: "de-DE_DieterV3Voice",
      };
      textToSpeech.synthesize(synthesizeParams).then((response) => {
        const audioStream = response.result;
        resolve(audioStream);
      }).catch((err) => {
        reject(err);
      });
    });
  };

  // answers to a given context with spoken language
  this.replyWithAudio = (ctx, text) => {
    return new Promise((resolve, reject) => {
      this.t2s(text).then((audioStream) => {
        ctx.replyWithVoice({ source: audioStream }).then(resolve).catch(reject);
      }).catch(reject);
    });
  };

  // returns a promise that resolves to a text
  this.s2t = (ctx) => {
    return new Promise((resolve) => {
      const speechToText = new SpeechToTextV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.WATSON_S2T,
        }),
        url: process.env.WATSON_S2T_URL,
      });

      const params = {
        objectMode: false,
        contentType: "audio/ogg",
        model: "de-DE_BroadbandModel",
      };

      ctx.telegram.getFileLink({ file_id: ctx.message.voice.file_id })
          .then((link) => {
            const recognizeStream = speechToText.recognizeUsingWebSocket(params);
            axios.get(link, { responseType: "stream" }).then((res) => {
              res.data.pipe(recognizeStream);
            }).catch((err) => {
              console.error(err);
            });

            recognizeStream.on("data", (event) => {
              resolve(event.toString());
            });
            recognizeStream.on("error", (event) => {
              console.error(event);
            });
          }).catch((err) => {
            console.error(err);
          });
    });
  };
  return this;
};
