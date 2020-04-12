const watsonSpeech = require("./services/watsonSpeech")();
const watsonAssisstant = require("./services/watsonAssistant")();
const Telegraf = require("telegraf");
const cron = require("node-cron");

module.exports = class Manager {
  constructor() {
    this.cronHasBeenStarted=false;
  }


  start(oAuth2Client) {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.usecases = {};
    this.usecases.start = require("./usecases/start.js")(db, oAuth2Client);
    this.usecases.absent = require("./usecases/sendAbsent.js")(db, oAuth2Client);
    this.usecases.uniNotifier = require("./usecases/uniNotifier.js")(db, oAuth2Client);
    this.usecases.tasks = require("./usecases/tasks.js")(db, oAuth2Client);
    this.usecases.book = require("./usecases/books.js")(db, oAuth2Client);
    this.usecases.meals = require("./usecases/meals.js")(db, oAuth2Client);

    this.bot.startPolling();

    this.bot.start((ctx) => {
      this.handleTextWithWatsonAssistant(ctx, "start");
    });

    this.bot.on("voice", (ctx) => {
      watsonSpeech.s2t(ctx).then((transcription) => {
        this.handleTextWithWatsonAssistant(ctx, transcription);
      }).catch((err) => {
        ctx.reply("There has been an error.");
        console.error(err);
      });
    });


    this.bot.on("text", (ctx) => {
      this.handleTextWithWatsonAssistant(ctx, ctx.update.message.text);
      this.updateCronJob(ctx);
    });
    this.bot.on("callback_query", (ctx) => {
      ctx.answerCbQuery();
      const usecaseName = ctx.callbackQuery.data.split("_")[0];
      if (this.usecases[usecaseName]) {
        this.usecases[usecaseName].onCallbackQuery(ctx);
      }
    });
  }


  updateCronJob(ctx) {
    if (this.cronHasBeenStarted) {
      return;
    }
    this.cronHasBeenStarted = true;

    // mock waRes.generic[0].text
    // so use case gets triggered regularly
    const waRes={generic: [{text: "meals_cron"}]};

    /**
         * Schedule cron job
         *
         * Allowed values
         * field value
         * -----------
         * second 0-59
         * minute 0-59
         * hour 0-23
         * day of month 1-31
         * month 1-12 (or names)
         * day of week 0-7 (or names, 0 or 7 are sunday)
         */

    // More info: https://www.npmjs.com/package/node-cron

    // run often for debugging
    // cron.schedule("0,10,20,30,40,50 * * * * 1-5", () => {

    // run Monday-Friday at 11.30
    cron.schedule("30 11 * * 1-5", () => {
      console.log("running every minute to 1 from 5");
      this.usecases.meals.onUpdate(ctx, waRes);
    });
  }


  handleTextWithWatsonAssistant(ctx, transcription) {
    watsonAssisstant.sendInput(transcription).then((waRes) => {
      const usecaseName = waRes.generic[0].text.split("_")[0];
      if (this.usecases[usecaseName]) {
        this.usecases[usecaseName].onUpdate(ctx, waRes);
      }
    });
  };


  getTelegramBot() {
    return this.bot;
  }
};
