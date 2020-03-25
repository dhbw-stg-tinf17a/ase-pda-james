const watsonSpeech = require("./services/watsonSpeech")();
const watsonAssisstant = require("./services/watsonAssistant")();
const Telegraf = require("telegraf");

let sessionId;

module.exports = class Manager {
  constructor() {
    this.carname = "ciao";
  }

  start(oAuth2Client) {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.usecases = {};
    this.usecases.absent = require("./usecases/sendAbsent.js")();
    this.usecases.uniNotifier = require("./usecases/uniNotifier.js")();
    this.usecases.tasks = require("./usecases/tasks.js")(db);
    this.usecases.book = require("./usecases/books.js")(db, oAuth2Client);
    this.usecases.meals = require("./usecases/meals.js")();
    // TODO add misc usecase

    this.bot.startPolling();

    this.bot.on("voice", (ctx) => {
      watsonSpeech.s2t(ctx).then((transcription)=>{
        this.handleTextWithWatsonAssistant(ctx, transcription);
      }).catch((err)=>{
        ctx.reply("There has been an error.");
        console.error(err);
      });
    });

    this.bot.on("text", (ctx)=>{
      this.handleTextWithWatsonAssistant(ctx, ctx.update.message.text);
    });

    this.bot.on("callback_query", (ctx)=>{
      ctx.answerCbQuery();
      const usecaseName = ctx.callbackQuery.data.split("_")[0];
      if (this.usecases[usecaseName]) {
        this.usecases[usecaseName].onCallbackQuery(ctx);
      }
    });
  }

  handleTextWithWatsonAssistant(ctx, transcription) {
    this.checkSession().then(() => {
      watsonAssisstant.sendInput(sessionId, transcription).then((waRes) => {
        const usecaseName = waRes.generic[0].text.split("_")[0];
        console.log(usecaseName);
        if (this.usecases[usecaseName]) {
          this.usecases[usecaseName].onUpdate(ctx, waRes);
        }
      });
    });
  }

  getTelegramBot() {
    return this.bot;
  }

  checkSession() {
    return new Promise((resolve, reject)=>{
      if (sessionId) {
        resolve(sessionId);
      } else {
        watsonAssisstant.createSession()
            .then((res) => {
              sessionId=res;
              resolve(sessionId);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
      }
    });
  };
};