const {google} = require("googleapis");
const {busyToFree} = require("../utils/calendarHelpers");
const moment = require("moment");

module.exports = function(db, oAuth2Client) {
  const preferences = require("./preferences")(db);

  this.authenticateUser = (ctx) => {
    preferences.set("chat_id_google_auth", ctx.chat.id).then(() => {
      const url = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/calendar",
      });

      ctx.reply(url);
    }).catch((err) => {
      console.error(err);
      ctx.reply("Tut mir leid, da ist mir ein Fehler unterlaufen.");
    });
  };

  this.getTimeUntilNextEvent = (calendarId = "primary") => {
    return new Promise((resolve, reject) => {
      preferences.get("google_auth_tokens").then((credentials) => {
        oAuth2Client.credentials = JSON.parse(credentials);

        return oAuth2Client;
      }).then((client) => {
        const calendar = google.calendar({version: "v3", auth: client});

        return calendar.events.list({
          calendarId,
          timeMin: moment().toISOString(),
          maxResults: 1,
          singleEvents: true,
          orderBy: "startTime",
        });
      }).then((res) => {
        const event = res.data.items[0];
        const start = event.start.date ?
            new Date(event.start.date) :
            new Date(event.start.dateTime);

        const timeUntil = Math.ceil((start.getTime() - (new Date()).getTime()) / 60000);
        resolve(timeUntil);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  this.getNextEvents = (calendarId = "primary") => {
    return new Promise((resolve, reject) => {
      preferences.get("google_auth_tokens").then((credentials) => {
        oAuth2Client.credentials = JSON.parse(credentials);

        return oAuth2Client;
      }).then((client) => {
        const calendar = google.calendar({version: "v3", auth: client});

        calendar.events.list({
          calendarId,
          timeMin: moment().toISOString(),
          maxResults: 15,
          singleEvents: true,
          orderBy: "startTime",
        }).then((res) => {
          const items = res.data.items.map(({summary, start, end}) => ({title: summary, start, end}));
          resolve(items);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  };

  this.getBusySlotsByCalendarId = (
      timeMin = moment().toISOString(),
      timeMax = moment().add(1, "d").toISOString(),
      calendarId) => {
    return new Promise((resolve, reject) => {
      preferences.get("google_auth_tokens").then((credentials) => {
        oAuth2Client.credentials = JSON.parse(credentials);

        return oAuth2Client;
      }).then((client) => {
        const calendar = google.calendar({version: "v3", auth: client});

        return calendar.freebusy.query({
          requestBody: {
            timeMin,
            timeMax,
            items: [
              {id: calendarId},
            ],
          },
        });
      }).then((res) => {
        resolve(res.data.calendars[calendarId].busy);
      }).catch((err) => {
        reject(err);
      });
    });
  };

  this.getStartOfFirstEvent = (timeMin = moment().toISOString(),
      timeMax = moment().add(1, "d").toISOString(),
      lectureCalendarId) => {
    return new Promise((resolve, reject) => {
      preferences.get("google_auth_tokens").then((credentials) => {
        oAuth2Client.credentials = JSON.parse(credentials);

        return oAuth2Client;
      }).then((client) => {
        const calendar = google.calendar({version: "v3", auth: client});

        return calendar.freebusy.query({
          requestBody: {
            timeMin,
            timeMax,
            items: [
              {id: "primary"},
              {id: lectureCalendarId},
            ],
          },
        });
      }).then((res) => {
        // merge busy slots from all calendars into one array
        const calendarKeys = Object.keys(res.data.calendars);
        const allSlots = calendarKeys.map((key) => [...res.data.calendars[key].busy]).flat();

        // custom sort function
        const sortSlots = (a, b) => {
          if ((new Date(a.start)).getTime() > (new Date(b.start)).getTime()) {
            return 1;
          } else if ((new Date(a.start)).getTime() < (new Date(b.start)).getTime()) {
            return -1;
          } else {
            return 0;
          }
        };

        // sort slots by start
        allSlots.sort(sortSlots);

        console.log(allSlots);

        const startOfFirst = allSlots.length > 0 ? new Date(allSlots[0].start) : null;

        resolve(startOfFirst);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  };

  this.createEvent = (event) => {
    return new Promise((resolve, reject) => {
      preferences.get("google_auth_tokens").then((credentials) => {
        oAuth2Client.credentials = JSON.parse(credentials);

        return oAuth2Client;
      }).then((client) => {
        const calendar = google.calendar({version: "v3", auth: client});

        return calendar.events.insert({
          calendarId: "primary",
          resource: event,
        });
      }).then((res) => {
        resolve(res.data);
      }).catch((err) => reject(err));
    });
  };

  this.getCalendars = () => {
    return new Promise((resolve, reject) => {
      preferences.get("google_auth_tokens").then((credentials) => {
        oAuth2Client.credentials = JSON.parse(credentials);

        return oAuth2Client;
      }).then((client) => {
        const calendar = google.calendar({version: "v3", auth: client});

        return calendar.calendarList.list({showHidden: true});
      }).then((res) => {
        const items = res.data.items.map((item) => ({id: item.id, summary: item.summaryOverride || item.summary}));
        resolve(items);
      }).catch((err) => reject(err));
    });
  };

  // not finished, use at own risk
  this.getFreeSlots = (lectureCalendarId) => {
    return new Promise((resolve, reject) => {
      preferences.get("google_auth_tokens").then((credentials) => {
        oAuth2Client.credentials = JSON.parse(credentials);

        return oAuth2Client;
      }).then((client) => {
        const calendar = google.calendar({version: "v3", auth: client});

        return calendar.freebusy.query({
          requestBody: {
            timeMin: moment().toISOString(),
            timeMax: moment().endOf("day").toISOString(),
            items: [
              {id: lectureCalendarId},
            ],
          },
        });
      }).then((res) => {
        const calendars = Object.keys(res.data.calendars);
        const freeSlotsByCalendar = calendars.map((calendar) => busyToFree(res.data.calendars[calendar].busy));
        resolve(freeSlotsByCalendar);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  };

  return this;
};
