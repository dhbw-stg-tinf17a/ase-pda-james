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
        cal.getTimeUntilNextEvent().then((start) => {
          ctx.reply(`${start} Minuten zum nächsten Termin`);
          ctx.reply("Was möchtest du essen? \n Indisch, Pizza, Italienisch...");
        }).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, jetzt ist etwas schiefgelaufen!");
        });
        break;
    }
  };
  return this;
};
