const watsonSpeech = require("../services/watsonSpeech")();
const Markup = require("telegraf/markup");
const library = require("../services/springer");
const mail = require("../services/mailer")();
const {
  createFreeSlotButtons,
  createEmailText,
  createEmailOptions,
  createLibraryButtons,
  createEvent,
} = require("../utils/bookHelpers");

module.exports = (db, oAuth2Client) => {
  const gCalendar = require("../services/gcalendar")(db, oAuth2Client);
  const preferences = require("../services/preferences")(db);
  const gPlaces = require("../services/gplaces")();

  let date;
  let keyword;
  let timeslot;
  let libraryAddress;
  let studyAtLibrary;

  this.onUpdate = (ctx, waRes) => {
    switch (waRes.generic[0].text) {
      case "book_welcome":
        // gPlaces.getPlaceById("a9f0125ba221f76ac07b01434446c77f4d9e5f08").then((places) => console.log(place));
        ctx.reply("Öffne den Link, um dich zu authentifizieren.");
        gCalendar.authenticateUser(ctx);
        // watsonSpeech.replyWithAudio(ctx, "Zu welchem Thema möchtest du recherchieren?");
        ctx.reply("Zu welchem Thema möchtest du recherchieren?");
        break;
      case "book_which-day":
        // watsonSpeech.replyWithAudio(ctx, "Wann möchtest du lernen?");
        ctx.reply("Wann möchtest du lernen?");
        break;
      case "book_slots":
        date = waRes.context.bookDate;
        keyword = waRes.context.keyword;
        console.log("date", date);
        console.log("keyword", keyword);
        // watsonSpeech.replyWithAudio(ctx, "Alles klar! Wähle einen freien Termin, der für dich passt.");
        ctx.reply("Alles klar! Wähle einen freien Termin, der für dich passt.");

        gCalendar.getFreeSlots(process.env.CALENDAR_ID, date).then((freeSlots) => {
          const buttons = createFreeSlotButtons(freeSlots);

          ctx.reply("Wähle einen freien Termin:", Markup.inlineKeyboard(buttons).extra());
        });
        break;
      default:
        return;
    }
  };

  this.onCallbackQuery = (ctx) => {
    const data = ctx.callbackQuery.data.substr("book_".length);
    const actionType = data.split("_")[0];
    const actionDetail = data.split("_")[1];

    switch (actionType) {
      case "slot":
        gCalendar.getFreeSlots(process.env.CALENDAR_ID, date).then((freeSlots) => {
          timeslot = freeSlots[actionDetail];
        }).then(() => {
          watsonSpeech.replyWithAudio(ctx, "Möchtest du zu Hause oder in der nächsten Bibliothek lernen?");

          const buttons = createLibraryButtons();
          ctx.reply("Wähle einen freien Termin:", Markup.inlineKeyboard(buttons).extra());
        }).catch((error) => {
          ctx.reply("Da ist uns ein Fehler unterlaufen.");
        });

        break;

      case "place":
        if (actionDetail === "library") {
          gPlaces.getPlaces({
            query: "Bibliothek",
            location: "48.805960, 9.234850", // TODO: Replace with Preference of home address
            rankby: "distance",
          }).then((places) => {
            libraryAddress = places.results[0].vicinity;
            console.log(places.results[0]);

            return gPlaces.isPlaceOpen(places.results[0].id, {
              minTime: timeslot.start,
              maxTime: timeslot.end,
            }).then((isOpen) => {
              if (isOpen) {
                studyAtLibrary = true;
              }
            }).catch((isOpen) => {
              if (!isOpen) {
                studyAtLibrary = false;
              }
            });
          }).then(() => {
            if (studyAtLibrary) {
              // do stuff
            } else {
              ctx.reply("Die nächste Bibliothek ist in dem Zeitraum geschlossen. Lerne lieber zu Hause!");
            }
          }).then(() => {
            return library.getByKeyword(keyword);
          }).then((data) => {
            const emailMessage = createEmailText(keyword, data.records);
            const emailOptions = createEmailOptions(keyword, emailMessage);

            return mail.sendMail(emailOptions);
          }).then(() => {
            ctx.reply(`Ich habe dir eine Liste von Artikeln zum Thema ${ keyword } geschickt.`);
          });
        } else {
          library.getByKeyword(keyword).then((data) => {
            const emailMessage = createEmailText(keyword, data.records);
            const emailOptions = createEmailOptions(keyword, emailMessage);

            return mail.sendMail(emailOptions);
          }).then(() => {
            ctx.reply(`Ich habe dir eine Liste von Artikeln zum Thema ${ keyword } geschickt.`);
          });
        }

        const newEvent = createEvent(keyword, timeslot, libraryAddress);
        gCalendar.createEvent(newEvent).then((createdEvent) => {
          if (createdEvent !== {}) {
            ctx.reply("Ich habe einen Kalendereintrag zum Lernen angelegt. Viel Erfolg!");
          } else {
            ctx.reply("Ich konnte keinen Kalendereintrag anlegen.");
          }
        }).catch((err) => {
          console.error(err);
          ctx.reply("Ich konnte leider keinen Kalendereintrag anlegen.");
        });

        break;

      default:
        return;
    }
  };

  return this;
};
