const vvs = require("../services/vvs/vvs.js")(); // for setting implicit preferences for public transport
const gplaces = require("../services/gplaces")(); // for setting implicit preferences for navigation

const Markup = require("telegraf/markup"); // Telegram answer button handling


module.exports = (preferences, oAuth2Client) => {
  const cal = require("../services/gcalendar")(preferences, oAuth2Client); // for Google authentication

  this._homeAddress;
  this._commutePreference;
  this._uniAddress;

  // required helper variables for handling callback button options for addresses
  this._homeAddresses;
  this._uniAddresses;

  // Function to set preferred travel method (4 II)
  this._chooseTravelMethod=(ctx)=>{
    // set travel method
    const travelMethods = [
      {displayName: "Laufen", value: "walking"},
      {displayName: "Auto", value: "driving"},
      {displayName: "Fahrrad", value: "bicycling"},
      {displayName: "ÖPNV", value: "vvs"}, // invokes (4ab) and (5cd)
    ];

    const travelMethodButtons = travelMethods.map((method) => {
      return [Markup.callbackButton(method.displayName, "start_tid_" + method.value)];
    });
    // (4 II)
    ctx.reply("Wähle deine bevorzugte Reisemöglichkeit aus:", Markup.inlineKeyboard(travelMethodButtons).extra());
  };

  // ==== INTERNAL WRAPPER FUNCTIONS FOR SERVICE RETURN HANDLING =======================================================

  // Process service function to obtain and save home address (3)
  this._setHomeAddress = (promise, ctx) => {
    promise.then((data) => {
      if (data.results.length > 1) { // (3a I)
        this._homeAddresses = [];
        const addressButtons = data.results.map((result) => {
          // drop ", Germany"
          const address = result.formatted_address.split(", ").slice(0, -1).join(", ");
          const location = result.geometry.location;
          const coordinates = location.lat + ", " + location.lng;
          // required for callback buttons that only can hold 64 bytes
          this._homeAddresses[result.place_id] = {address: address, location: coordinates};
          return [Markup.callbackButton(address, "start_addr_" + result.place_id)];
        });

        ctx.reply("Wähle deine Adresse aus:", Markup.inlineKeyboard(addressButtons).extra()); // (3a II)
      } else { // (4)
        const address = data.results[0].formatted_address.split(", ").slice(0, -1).join(", ");
        const location = data.results[0].geometry.location;
        const coordinates = location.lat + ", " + location.lng;
        this._homeAddress = address;
        try {
          preferences.set("home_address", address);
          preferences.set("home_address_coordinates", coordinates).then(() => {
            ctx.reply(`Ich habe ${address} als Heimatadresse gespeichert.`);
            this._chooseTravelMethod(ctx); // (4)
          });
        } catch (error) {
          console.log(error);
          ctx.reply("Sorry, ich konnte deine Heimatadresse nicht speichern...");
        }
      }
    }).catch((err) => {
      ctx.reply("Sorry, die Adresse wurde nicht gefunden. Starte den Prozess neu mit \"start\"");
      console.log(err);
    });
  };

  // Process service function to obtain and save transit stop (4ab) (5cd)
  this._setStop = (promise, ctx, indicator) => {
    let stopType;
    let stopString;
    if (indicator === "sid") {
      stopType = "home";
      stopString = "Haltestelle zuhause";
    } else if (indicator === "usid") {
      stopType = "uni";
      stopString = "Uni-Haltestelle";
    } else {
      return new Error("Invalid indicator");
    }

    promise.then((data) => {
      if (Array.isArray(data)) { // (4a I) and (5c I)
        const stopButtons = data.map((stop) => {
          return [Markup.callbackButton(stop.name, `start_${indicator}_` + stop.stopID)];
        });
        ctx.reply(`Wähle deine ${stopString} aus:`, Markup.inlineKeyboard(stopButtons).extra()); // (4a II) and (5c II)
      } else { // (4b) and (5d)
        preferences.set(`${stopType}_stop_id`, data.stopID).then(() => {
          ctx.reply(`Ich habe deine ${stopString}: "${data.name}" gespeichert`);
          if (stopType === "home") { // (4b) => (5)
            ctx.reply("An welcher Uni/Hochschule bist du?");
          } else { // (5d) => (6)
            ctx.reply("Jetzt sag mir noch die Email Adresse deines Sekretariats");
          }
        }).catch((error) => {
          console.log(error);
          ctx.reply(`Sorry, ich konnte deine ${stopString} nicht speichern...`);
        });
      }
    }).catch((error) => {
      ctx.reply("Sorry, jetzt gab es ein Problem");
    });
  };

  // Process service function to obtain and save uni address (5)
  this._setUniAddress=(promise, ctx)=> {
    promise.then((data) => {
      const location = data.results;

      if (location.length > 1) { // (5a I)
        this._uniAddresses = [];
        const uniButtons = location.map((uni) => {
          // drop ", Germany" from address string
          const address = uni.formatted_address.split(", ").slice(0, -1).join(", ");
          // required for callback buttons that only can hold 64 bytes
          this._uniAddresses[uni.place_id] = {address: address};
          return [Markup.callbackButton(address, "start_uid_" + uni.place_id)];
        });
        ctx.reply("Wähle deine Uni aus:", Markup.inlineKeyboard(uniButtons).extra()); // (5a II)
      } else { // (5b)
        const address = data.results[0].formatted_address.split(", ").slice(0, -1).join(", ");
        this._uniAddress = address;
        preferences.set("uni_address", address).then(() => {
          ctx.reply(`Ich habe ${address} als Adresse deiner Uni gespeichert.`);
          if (this._commutePreference==="vvs") { // (5cd)
            this._setStop(vvs.getStopByKeyword(address), ctx, "usid");
          } else { // (6)
            ctx.reply("Jetzt sag mir noch die Email Adresse deines Sekretariats");
          }
        }).catch((error)=>{
          console.log(error);
          ctx.reply("Sorry, ich konnte deine Uni-Adresse nicht speichern...");
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  // Process service function to authenticate user for Google Calendar (7)
  this._auth = (fn) => fn;

  // Process service function to obtain and save lecture calendar. (8)
  this._setCalendar=(promise, ctx) => { // (8 I)
    promise.then((cals) => {
      const buttons = cals.map((resCal) => [Markup.callbackButton(resCal.summary, "start_cid_" + resCal.id)]);
      ctx.reply("Wähle deinen Vorlesungskalender aus:", Markup.inlineKeyboard(buttons).extra()); // (8 II)
    }).catch((err) => {
      ctx.reply("Sorry, es gab einen Fehler!");
      console.log(err);
    });
  };

  // ===================================================================================================================

  // ===================================================================================================================
  //  WATSON ASSISTANT DIALOG HANDLING
  // ===================================================================================================================
  this.onUpdate = (ctx, waRes) => {
    switch (waRes.generic[0].text) {
      // Beginning of dialog (automatically triggered) (0) => (1)
      case "start":
        ctx.reply("Hallo, ich bin James! 🎩\n" +
            "Erzähl mir doch ein bisschen was über dich.\n" +
            "Wie heißt du?");
        break;

      // Process name and ask for email address (1) => (2)
      case "start_name":
        preferences.set("name", waRes.context.name).catch((error)=>{
          console.log(error);
          ctx.reply("Sorry, ich konnte deinen Namen nicht speichern...");
        });
        ctx.reply("Hallo " + waRes.context.name + "\n" +
            "Sag mir deine Email");
        break;

      // Process email address and ask for home address (2) => (3)
      case "start_email":
        preferences.set("email", waRes.context.email).catch((error)=>{
          console.log(error);
          ctx.reply("Sorry, ich konnte deine Email-Adresse nicht speichern...");
        });
        ctx.reply("Sag mir deine Adresse");
        break;

      // Process home address (3) => (3a) or (4)
      case "start_address":
        this._setHomeAddress(gplaces.getPlaces({query: waRes.context.address}), ctx); // (3)
        break;

      // Process university address (5) => (5a) or (5b) or (6)
      case "start_uni":
        this._setUniAddress(gplaces.getPlaces({query: waRes.context.uni}), ctx); // (5)
        break;

      // Process university secretary email address and authenticate user for Google Calendar (6) => (7)
      case "start_uni_email":
        preferences.set("uni_email", waRes.context.uni_email).catch((error)=>{
          console.log(error);
          ctx.reply("Sorry, ich konnte deine Uni-Email-Adresse nicht speichern...");
        });

        ctx.reply("Jetzt richten wir deinen Kalender ein. Bitte authentifiziere dich mit diesem Link:");
        this._auth(cal.authenticateUser(ctx)); // (7)
        break;

      // Ask to choose lecture calendar (7) => (8)
      case "start_is_authenticated":
        this._setCalendar(cal.getCalendars(), ctx);
        break;
    }
  };
  // ===================================================================================================================

  // ===================================================================================================================
  //  DIALOG CALLBACK HANDLING
  //  Disclaimer: Switch case indicators are brief since Telegraf buttons can only hold 64 bytes
  // ===================================================================================================================
  this.onCallbackQuery = (ctx) => {
    // remove "start_" prefix
    const buttonData = ctx.callbackQuery.data.split("_").slice(1).join("_");
    const indicator = buttonData.split("_")[0];
    const data = buttonData.split("_").slice(1).join("_");

    switch (indicator) {
      // Choose home address from list and ask for preferred travel method (3a II) => (4)
      case "addr":
        this._homeAddress = this._homeAddresses[data].address;
        try {
          preferences.set("home_address", this._homeAddress);
          preferences.set("home_address_coordinates", this._homeAddresses[data].location);
        } catch (error) {
          console.log(error);
          ctx.reply("Sorry, ich konnte deine Heimatadresse nicht speichern...");
        }

        this._chooseTravelMethod(ctx); // (4)
        break;

      // Choose preferred travel method from list and process home stop (4 II) => (4ab) OR
      // Choose preferred travel method from list and ask for university name (4 II) => (5)
      case "tid":
        preferences.set("commute", data).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, ich konnte deine bevorzugte Transportmöglichkeit nicht speichern...");
        });
        this._commutePreference = data;
        if (this._commutePreference === "vvs") { // (4ab)
          this._setStop(vvs.getStopByKeyword(this._homeAddress), ctx, "sid");
        } else { // (5)
          ctx.reply("An welcher Uni/Hochschule bist du?"); // (5)
        }
        break;

      // OPTIONAL: Choose home stop from list and ask for university address (4a II) => (5)
      case "sid":
        preferences.set("home_stop_id", data).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, ich konnte deine Haltestelle zuhause nicht speichern...");
        });
        ctx.reply("An welcher Uni/Hochschule bist du?"); // (5)
        break;

      // OPTIONAL: Choose uni address from list and process uni stop (5a II) => (5cd)
      // OPTIONAL: Choose uni address from list and ask for uni secretary email address (5a II) => (6)
      case "uid":
        const uniAddress = this._uniAddresses[data].address;
        preferences.set("uni_address", uniAddress).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, ich konnte deine Uni-Adresse nicht speichern...");
        });
        if (this._commutePreference==="vvs") { // (5cd)
          this._setStop(vvs.getStopByKeyword(uniAddress), ctx, "usid");
        } else { // (6)
          ctx.reply("Jetzt sag mir noch die Email Adresse deines Sekretariats"); // (6)
        }
        break;

      // OPTIONAL: Choose uni stop from list and ask for uni secretary address (5c II) => (6)
      case "usid":
        preferences.set("uni_stop_id", data).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, ich konnte deine Uni-Haltestelle nicht speichern...");
        });
        ctx.reply("Jetzt sag mir noch die Email Adresse deines Sekretariats");
        break;

      // Save lecture calendar ID (8 II) => done!
      case "cid":
        preferences.set("lecture_cal_id", data).catch((error) => {
          console.log(error);
          ctx.reply("Sorry, ich konnte deinen Kalender nicht speichern...");
        });
        ctx.reply("Danke! Das war's.");
        break;
    }
  };
  // ===================================================================================================================

  return this;
};
