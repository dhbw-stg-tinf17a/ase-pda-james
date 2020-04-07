const gmaps = require("../services/gmaps");
const gplaces = require("../services/gplaces")();
const watsonSpeech = require("../services/watsonSpeech")();

const sendPlaces = (ctx, query) => {
  // console.log(process.env.GOOGLE_PLACES_KEY);
  gplaces.getPlaces({
    query: query,
  }).then((answer) => {
    // console.log("answer", answer);
    for (let i = 0; i < 3; i++) {
      const mapsURL = gmaps.getGoogleMapsRedirectionURL(answer.results[i].formatted_address,
          answer.results[i].place_id);
      ctx.replyWithHTML(`<a href='${mapsURL}'>${answer.results[i].name}</a>`), {replyWithHTML: true};
    }
  }).catch((err) => {
    ctx.reply("Ups, da hat etwas nicht funktioniert..." + err);
    // console.log(`answer is ${err}`);
  });
};

module.exports = (db, oAuth2Client) => {
  const cal = require("../services/gcalendar")(db, oAuth2Client);
  this.onUpdate = (ctx, waRes) => {
    const replyPlaces = () => {
      const typeOfFood = waRes.entities[0].value;
      ctx.reply(`Okay hier sind 3 Vorschläge für ${typeOfFood}:`);
      sendPlaces(ctx, typeOfFood);
    };

    // log watson answer if necessary
    // console.log(waRes);

    // if authentication has renewed uncomment line below
    // cal.authenticateUser(ctx);

    // print use case information if necessary
    ctx.reply("DEBUG" + waRes.generic[0].text);
    switch (waRes.generic[0].text) {
      case "meals_start":
        cal.getTimeUntilNextEvent().then((start) => {
          ctx.reply(`${start} Minuten zum nächsten Termin`);
          ctx.reply("Was möchtest du essen? \n Indisch, Pizza, Italienisch...");
        }).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, jetzt ist etwas schiefgelaufen!");
        });
        break;

        // "PIZZA"
      case "meals_food_only":
        replyPlaces();
        break;

        // "ICH WILL PIZZA ESSEN"
      case "meals_start_with_food":
        cal.getTimeUntilNextEvent().then((start) => {
          ctx.reply(`${start} Minuten zum nächsten Temin`);
          replyPlaces();
          watsonSpeech.replyWithAudio(ctx, `${start} Minuten zum nächsten Termin`).then(() => {
          }).catch((error) => console.error("Error in Watson.replyWithAudio", error));
        }).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, jetzt ist etwas schiefgelaufen!");
        });

        break;
      default:
        ctx.reply("Beep Beep 10101011110 da gab es einen Fehler :(");
        break;
    }
  };
  return this;
};
