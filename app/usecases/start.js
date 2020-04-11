const Markup = require("telegraf/markup");

module.exports = (db, oAuth2Client) => {
  const cal = require("../services/gcalendar")(db, oAuth2Client);
  this.onUpdate = (ctx, waRes) => {
    console.log("use case", waRes.generic[0].text);

    ctx.reply(waRes.generic[0].text);

    // const response = waRes.context.name;
    // console.log("Antwort", response);

    switch (waRes.generic[0].text) {
      case "start":
        ctx.reply("Hallo ich bin James!");
        ctx.reply("Erzähl mir doch ein bisschen was über dich.");
        ctx.reply("Wie heißt du?");
        break;

      case "start_name":
        ctx.reply("Hallo "+ waRes.context.name + "\n Sag mir deine Email");
        break;

      case "start_email":
        ctx.reply(waRes.context.email +"\n Sag mir deine Adresse");
        break;

      case "start_address":
        ctx.reply(waRes.context.address+"\n Sag mir deine Uni");
        break;

      case "start_uni":
        ctx.reply(waRes.context.uni+"\n Sag mir deine Uni Email");
        break;

      case "start_uni_email":
        ctx.reply(waRes.context.uni_email);
        ctx.reply("So... jetzt richten wir deinen Kalender ein");

        cal.authenticateUser(ctx);
        cal.getTimeUntilNextEvent().then((start) => {
          ctx.reply(`${start} Minuten zum nächsten Termin`);
        }).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, jetzt ist etwas schiefgelaufen!");
        });


        break;

      case "start_oauth":
        cal.authenticateUser(ctx);
        break;

      case "start_is_authenticated":
        ctx.reply("Authentifiziert");

        cal.getCalendars().then((cals) => {
          console.log(cals);
          const buttons = cals.map((resCal) => [Markup.callbackButton(resCal.summary, "start_"+resCal.id)]);
          ctx.reply("Wähle deinen Vorlesungskalender aus:", Markup.inlineKeyboard(buttons).extra());
        }).catch((err) => {
          ctx.reply("Sorry, an error occurred!");
        });
        break;
    }
  };
  this.onCallbackQuery = (ctx) => {
    console.log("\n***onCallbackQuery***");
    console.log("full data:", ctx.callbackQuery.data);

    // remove start_ prefix
    const buttonData = ctx.callbackQuery.data.split("_").slice(1).join("");
    console.log("data:", buttonData);
    if (buttonData.includes("calendar")) {
      console.log("oncallback calendar:", buttonData);
      const calendarId = buttonData;
    }
  };
  return this;
};
