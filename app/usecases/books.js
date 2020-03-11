const library = require("../services/springer");
const cal = require("../services/gcalendar");

module.exports = function() {
  this.onUpdate = (ctx) => {
    if (ctx.update.message.text === "books") {
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
    } else if (ctx.update.message.text === "books events") {
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
    } else if (ctx.update.message.text === "books freebusy") {
      cal.getFreeBusy("2020-03-10T00:00:00+01:00",
          "2020-03-20T00:00:00+01:00",
          process.env.CALENDAR_ID).then((calendars) => {
        if (calendars) {
          ctx.reply("busy found");
        } else {
          ctx.reply("no busy found");
        }
      }).catch((err) => {
        ctx.reply("error occurred");
      });
    } else if (ctx.update.message.text === "books newevent") {
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
          ctx.reply(`The event ${createdEvent.summary} was created successfully!`);
        } else {
          ctx.reply("Sorry, no event was created.");
        }
      }).catch((err) => {
        ctx.reply("Sorry, an error occurred!");
      });
    }
  };
  return this;
};
