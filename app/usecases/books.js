const watsonSpeech = require("../services/watsonSpeech")();
const Markup = require("telegraf/markup");
const library = require("../services/springer");
const mail = require("../services/mailer")();
const {createFreeSlotButtons, createEmailText, createEmailOptions} = require("../utils/bookHelpers");

module.exports = (db, oAuth2Client) => {
  const gCalendar = require("../services/gcalendar")(db, oAuth2Client);
  const preferences = require("../services/preferences")(db);
  const gPlaces = require("../services/gplaces")();

  let date = "";
  let keyword = "";
  let timeslot = {};
  let libraryAddress = "";

  this.onUpdate = (ctx, waRes) => {
    switch (waRes.generic[0].text) {
      case "book_welcome":
        gCalendar.authenticateUser(ctx);
        watsonSpeech.replyWithAudio(ctx, "Zu welchem Thema möchtest du recherchieren?");
        break;
      case "book_which-day":
        keyword = waRes.context.keyword;
        watsonSpeech.replyWithAudio(ctx, "Wann möchtest du lernen?");
        break;
      case "book_slots":
        date = waRes.context.bookDate;
        watsonSpeech.replyWithAudio(ctx, "Alles klar! Wähle einen freien Termin, der für dich passt.");

        gCalendar.getFreeSlots(process.env.CALENDAR_ID).then((freeSlots) => {
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
    /* if (ctx.update.message && ctx.update.message.text === "books") {
      library.getByTitle().then((res) => {
        const data = res.data;
        const collatedTitles = data.records.slice(5).map((record) => record.title).join("\n");
        const message = `<b>The first five articles are:</b> ${ "\n" + collatedTitles }`;
        ctx.reply("You searched for \"user experience\".").then(() => {
          ctx.replyWithHTML(message);
        });
      }).catch(() => {
        ctx.reply("There has been an error, sorry");
      });
    } else if (ctx.update.message && ctx.update.message.text === "books events") {
      cal.getNextEvents().then((res) => {
        const eventsMessage =
            res.map((event) => (`<b>${ event.title }</b> (${ event.start.date || event.start.dateTime } -` +
                `${ event.end.date || event.end.dateTime })`),
            ).join("\n\n");
        ctx.reply("You're next 15 events are:\n").then(() => {
          ctx.replyWithHTML(eventsMessage);
        });
      }).catch(() => {
        ctx.reply("There has been an error, sorry");
      });
    } else if (ctx.update.message && ctx.update.message.text === "books freebusy") {
      cal.getBusySlotsByCalendarId("2020-03-10T00:00:00+01:00",
          "2020-03-20T00:00:00+01:00",
          process.env.CALENDAR_ID).then((busySlots) => {
        if (busySlots) {
          ctx.reply("busy found");
        } else {
          ctx.reply("no busy found");
        }
      }).catch((err) => {
        ctx.reply("error occurred");
      });
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
      }).catch((err) => {
        ctx.reply("Sorry, an error occurred!");
      });
    } else if (ctx.update.message && ctx.update.message.text === "books auth") {
      cal.authenticateUser(ctx);
    } else if (ctx.update.message && ctx.update.message.text === "books cals") {
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
      }).then(() => {
        ctx.reply("Super, dann haben wir deinen Vorlesungskalender eingerichtet!");
      }).catch((err) => {
        ctx.reply("Da hat wohl etwas nicht funktioniert, sorry!");
      });
    } else if (ctx.update.message && ctx.update.message.text === "books time") {
      cal.getTimeUntilNextEvent().then((start) => {
        ctx.reply(`Start time is ${ start }.`);
      });
    } else if (ctx.update.message && ctx.update.message.text === "books a") {
      cal.getStartOfFirstEvent("2020-03-22T00:00:00+01:00",
          "2020-03-30T01:00:00+01:00",
          process.env.CALENDAR_ID).then((startOfFirst) => {
        if (startOfFirst) {
          ctx.reply(`start of first event: ${startOfFirst}`);
        } else {
          ctx.reply("none");
        }
      }).catch((err) => {
        ctx.reply("error occurred");
      });
    } else if (ctx.update.message && ctx.update.message.text === "books f") {
      cal.getFreeSlots(process.env.CALENDAR_ID).then((allSlots) => {
      }).catch((err) => {
        ctx.reply("error occurred");
      });
    } */
  };

  this.onCallbackQuery = (ctx) => {
    const data = ctx.callbackQuery.data.substr("book_".length);
    const actionType = data.split("_")[0];
    const actionDetail = data.split("_")[1];

    switch (actionType) {
      case "slot":
        gCalendar.getFreeSlots(process.env.CALENDAR_ID).then((freeSlots) => {
          timeslot = freeSlots[actionDetail];
        }).then(() => {
          return gPlaces.getPlaces({
            query: "Bibliothek",
            location: "48.805960, 9.234850", // TODO: Replace with Preference of home address
            rankby: "distance",
          });
        }).then((places) => {
          libraryAddress = places.results[0].vicinity;

          // TODO: Get opening hours and check whether open for studying, else set home address
        }).then(() => {
          return library.getByKeyword(keyword);
        }).then((data) => {
          const emailMessage = createEmailText(keyword, data.records);
          const emailOptions = createEmailOptions(keyword, emailMessage);

          return mail.sendMail(emailOptions);
        }).then(() => {
          ctx.reply(`Ich habe dir eine Liste von Artikeln zum Thema ${keyword} geschickt.`);
        });
        break;
      default:
        return;
    }
  };

  return this;
};
