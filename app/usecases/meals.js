const gmaps = require("../services/gmaps");
const gsearch = require("../services/gsearch");
const gplaces = require("../services/gplaces")();


const sendPlaces = (ctx, query) => {
  console.log(process.env.GOOGLE_PLACES_KEY);
  gplaces.getPlaces({
    query: query,
  }).then((answer) => {
    console.log("answer", answer);
    ctx.reply(answer.results[0].name + "\n" + answer.results[1].name + "\n" + answer.results[2].name + "\n");
  }).catch((err) => {
    ctx.reply("Ups, da hat etwas nicht funktioniert..." + err);
    console.log(`answer is ${err}`);
  });
};

module.exports = (db, oAuth2Client) => {
  const cal = require("../services/gcalendar")(db, oAuth2Client);
  this.onUpdate = (ctx, waRes) => {
    console.log(waRes)

    // if authentication has renewed uncomment line below
    // cal.authenticateUser(ctx);
    ctx.reply("DEBUG"+waRes.generic[0].text);
    switch (waRes.generic[0].text) {
      case "meals_start":
        ctx.reply("Du hast bis um x uhr keine Vorlesung im Kalender");
        ctx.reply("Wo möchtest du essen gehen?");
        break;
      case "meals_start_with_food":
        cal.getTimeUntilNextEvent().then((start) => {
          ctx.reply(`${start} Minuten zum nächsten Temin`);
          ctx.reply("Okay hier sind 3 Vorschläge:");
          sendPlaces(ctx, "Pizza");
        }).catch((error)=>{
          console.log(error);
          ctx.reply("Sorry, jetzt ist etwas schiefgelaufen!");
        });

        break;
      default:
        ctx.reply("Beep Beep 10101011110 da gab es einen Fehler :(");
        break;
    }

    /*   if (ctx.update.message.text === "search") {
                                             gsearch.getSearchResults("Apotheke Rothebühlplatz")
                                                 .then((data) => {
                                                   console.log("return from getSearchResults", data);
                                                   ctx.reply(data);
                                                 });
                                           }
                                           if (ctx.update.message.text === "meals") {
                                             ctx.reply("Directions");

                                             gmaps.getDirections("Stuttgart DHBW Rotebühlplatz", "Gerber Stuttgart")
                                                 .then((data) => {
                                                   console.log("return from getDirections", data);
                                                   ctx.reply(data);
                                                 });
                                             ctx.reply(gmaps.getGoogleMapsRedirectionURL("Stuttgart DHBW Rotebühlplatz"));
                                           }
                                         };*/
  };
  return this;
};
