module.exports = (db, oAuth2Client) => {
  const Markup = require("telegraf/markup");
  const library = require("../services/springer");
  const cal = require("../services/gcalendar")(db, oAuth2Client);
  const preferences = require("../services/preferences")(db);

  this.onUpdate = (ctx) => {
    if (ctx.update.message && ctx.update.message.text === "books") {
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
    }
  };
  return this;
};
