const gmaps = require("../services/gmaps");
const gplaces = require("../services/gplaces")();
const watsonSpeech = require("../services/watsonSpeech")();


// reply with 3 matching places for user food choice
const sendPlaces = (ctx, query) => {
  gplaces.getPlaces({
    query: query,
  }).then((answer) => {
    for (let i = 0; i < 3; i++) {
      const mapsURL = gmaps.getGoogleMapsRedirectionURL(answer.results[i].formatted_address,
          answer.results[i].place_id);

      // reply as HTML links to gmaps
      ctx.replyWithHTML(`<a href='${mapsURL}'>${answer.results[i].name}</a>`);
    }
  }).catch((err) => {
    ctx.reply("Ups, da hat etwas nicht funktioniert..." + err);
    // console.log(`answer is ${err}`);
  });
};

module.exports = (preferences, oAuth2Client) => {
  const cal = require("../services/gcalendar")(preferences, oAuth2Client);
  this.onUpdate = (ctx, waRes) => {
    const replyPlaces = () => {
      const typeOfFood = waRes.entities[0].value;
      ctx.reply(`Okay hier sind 3 Vorschläge für ${typeOfFood}:`);
      sendPlaces(ctx, typeOfFood);
    };

    // log watson answer if necessary
    // console.log(waRes);

    // if authentication has to be renewed uncomment line below
    // cal.authenticateUser(ctx);

    // print use case information if necessary
    // ctx.reply("DEBUG" + waRes.generic[0].text);
    switch (waRes.generic[0].text) {
      // "ICH HABE HUNGER" continues with meals_food_only
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

          // watson seems to be under maintenance and cannot be tested properly
          /* watsonSpeech.replyWithAudio(ctx, `${start} Minuten zum nächsten Termin`).then(() => {
                     }).catch(
                     (error) => console.error("Error in Watson.replyWithAudio", error)
                     );*/
        }).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, jetzt ist etwas schiefgelaufen!");
        });
        break;

        // "CRON JOB"
      case "meals_cron":
        cal.getTimeUntilNextEvent().then((start) => {
          ctx.reply(`Du hast ${start} Minuten zum nächsten Temin. `+
          "Sag mir was du essen willst und ich suche etwas passendes! (z.B. Pizza, Indisch...)");
        }).catch((error) => {
          // dont message user in case of an error
          // user does not expect a scheduled message stating an error
          console.log("Error in cron job", error);
        });
        break;

      default:
        ctx.reply("Ups, da ist etwas schiefgelaufen...");
        break;
    }
  };
  return this;
};
