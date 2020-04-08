const watsonSpeech = require("../services/watsonSpeech")();
const Markup = require("telegraf/markup");
const library = require("../services/springer");
const mail = require("../services/mailer")();
const {createFreeSlotButtons, createEmailText, createEmailOptions, createLibraryButtons} = require("../utils/bookHelpers");

module.exports = (db, oAuth2Client) => {
  const gCalendar = require("../services/gcalendar")(db, oAuth2Client);
  const preferences = require("../services/preferences")(db);
  const gPlaces = require("../services/gplaces")();

  this.date = "";
  this.keyword = "";
  this.timeslot = {};
  this.libraryAddress = "";
  this.studyAtLibrary = false;

  this.onUpdate = (ctx, waRes) => {
    switch (waRes.generic[0].text) {
      case "book_welcome":
        gCalendar.authenticateUser(ctx);
        // watsonSpeech.replyWithAudio(ctx, "Zu welchem Thema möchtest du recherchieren?");
        ctx.reply("Zu welchem Thema möchtest du recherchieren?");
        break;
      case "book_which-day":
        // watsonSpeech.replyWithAudio(ctx, "Wann möchtest du lernen?");
        ctx.reply("Wann möchtest du lernen?");
        break;
      case "book_slots":
        this.date = waRes.context.bookDate;
        this.keyword = waRes.context.keyword;
        console.log("date", this.date);
        console.log("keyword", this.keyword);
        // watsonSpeech.replyWithAudio(ctx, "Alles klar! Wähle einen freien Termin, der für dich passt.");
        ctx.reply("Alles klar! Wähle einen freien Termin, der für dich passt.");

        gCalendar.getFreeSlots(process.env.CALENDAR_ID, this.date).then((freeSlots) => {
          const buttons = createFreeSlotButtons(freeSlots);

          ctx.reply("Wähle einen freien Termin:", Markup.inlineKeyboard(buttons).extra());
        });
        break;
      default:
        return;
    }
    /**
     * Here for reference
     */
    /*
    } else if (ctx.update.message && ctx.update.message.text === "books newevent") {
      const testEvent = {
        summary: "Test from James",
        start: {
          dateTime: "2020-03-15T10:00:00+01:00",
        },
        end: {
          dateTime: "2020-03-15T10:00:00+01:00",
        },
      };
      cal.createEvent(testEvent).then((createdEvent) => {
        if (createdEvent !== {}) {
          ctx.reply(`The event ${ createdEvent.summary } was created successfully!`);
        } else {
          ctx.reply("Sorry, no event was created.");
        }
      })

      if (ctx.update.message && ctx.update.message.text === "books cals") {
      cal.getCalendars().then((cals) => {
        const buttons = cals.map((resCal) => [Markup.callbackButton(resCal.summary, resCal.summary)]);
        ctx.reply("Wähle deinen Vorlesungskalender aus:", Markup.inlineKeyboard(buttons).extra());
      }).catch((err) => {
        ctx.reply("Sorry, an error occurred!");
      });
    } else if (ctx.updateType === "callback_query") {
      cal.getCalendars().then((calendars) => {
        const lectureCalendarId = calendars.filter((calendar) => ctx.callbackQuery.data === calendar.summary)[0].id;
        return preferences.set("lecture_calendar_id", lectureCalendarId);
      }) */
  };

  this.onCallbackQuery = (ctx) => {
    const data = ctx.callbackQuery.data.substr("book_".length);
    const actionType = data.split("_")[0];
    const actionDetail = data.split("_")[1];

    switch (actionType) {
      case "slot":
        gCalendar.getFreeSlots(process.env.CALENDAR_ID, date).then((freeSlots) => {
          this.timeslot = freeSlots[actionDetail];
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
            this.libraryAddress = places.results[0].vicinity;

            return places.isPlaceOpen(places.results[0].id, {
              minTime: this.timeslot.start,
              maxTime: this.timeslot.end,
            }).then((isOpen) => {
              if (isOpen) {
                this.studyAtLibrary = true;
              }
            }).catch((isOpen) => {
              if (!isOpen) {
                this.studyAtLibrary = false;
              }
            });
          }).then(() => {
            if (this.studyAtLibrary) {
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
        }
        break;

      default:
        return;
    }
  };

  return this;
};
