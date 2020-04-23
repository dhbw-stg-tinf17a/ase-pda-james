const gmaps = require("../../services/api/gmaps/gmaps");
const gplaces = require("../../services/api/gplaces/gplaces")();
const watsonSpeech = require("../../modules/watson-speech/watsonSpeech")();
const DB_KEY_LAST_FOOD = "meals_last_food";

module.exports = (preferences, oAuth2Client) => {
  const cal = require("../../services/api/gcalendar/gcalendar")(preferences, oAuth2Client);


  // reply with 3 matching places for user food choice
  this._sendPlaces = (ctx, query) => {
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
      ctx.reply(`Ups, da hat etwas nicht funktioniert...${ err}`);
    });
  };

  this._capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

  this._replyPlaces = (ctx, typeOfFood, prefs) => {
    typeOfFood = this._capitalize(typeOfFood);
    // store food in preferences
    prefs.set(DB_KEY_LAST_FOOD, typeOfFood);

    ctx.reply(`Okay hier sind 3 Vorschläge für ${typeOfFood}:`);
    this._sendPlaces(ctx, typeOfFood);
  };

  this._replyMealsStart = (promise, ctx, prefs) => {
    promise.then((start) => {
      prefs.get(DB_KEY_LAST_FOOD).then((data) => {
        let reply = `${start} Minuten zum nächsten Termin\nWas möchtest du essen?\n`;
        if (data) {
          reply += `Das letzte mal hast du nach "${data}" gesucht.`;
        } else {
          reply += "Indisch, Pizza, Italienisch...";
        }
        ctx.reply(reply);
      },
      );
    }).catch((error) => {
      console.error(error);
      ctx.reply("Sorry, jetzt ist etwas schiefgelaufen!");
    });
  };

  this._replyTextAndSpeech = (ctx, text) => {
    ctx.reply(text);
    return watsonSpeech.replyWithAudio(ctx, text).catch(
        (error) => console.error("Error in Watson.replyWithAudio", error),
    );
  };

  this.onUpdate = async (ctx, waRes) => {
    const calendarId = await preferences.get("lecture_cal_id");
    switch (waRes.generic[0].text) {
      // "ICH HABE HUNGER" continues with meals_food_only
      case "meals_start":
        try {
          this._replyMealsStart(cal.getTimeUntilNextEvent(calendarId), ctx, preferences);
        } catch (error) {
          console.error(error);
          ctx.reply("Sorry, jetzt ist etwas schiefgelaufen!");
        }
        break;
        // "PIZZA"
      case "meals_food_only":
        this._replyPlaces(ctx, waRes.entities[0].value, preferences);
        break;

        // "ICH WILL PIZZA ESSEN"
      case "meals_start_with_food":
        cal.getTimeUntilNextEvent(calendarId).then((start) => {
          this._replyTextAndSpeech(ctx, `Du hast ${start} Minuten zum nächsten Termin`);
          this._replyPlaces(ctx, waRes.entities[0].value, preferences);
        }).catch((error) => {
          console.error(error);
          ctx.reply("Sorry, jetzt ist etwas schiefgelaufen!");
        });
        break;

        // "CRON JOB"
      case "meals_cron":
        cal.getTimeUntilNextEvent(calendarId).then((start) => {
          ctx.reply(`Du hast ${start} Minuten zum nächsten Temin. ` +
                        "Sag mir was du essen willst und ich suche etwas passendes! (z.B. Pizza, Indisch...)");
        }).catch((error) => {
          // dont message user in case of an error
          // user does not expect a scheduled message stating an error
          console.error("Error in cron job", error);
        });
        break;

      default:
        ctx.reply("Ups, da ist etwas schiefgelaufen...");
        break;
    }
  };
  return this;
};
