const {google} = require("googleapis");

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
          timeMin: (new Date()).toISOString(),
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

  this.getNextEvents = () => {
    return new Promise((resolve, reject) => {
      preferences.get("google_auth_tokens").then((credentials) => {
        oAuth2Client.credentials = JSON.parse(credentials);

        return oAuth2Client;
      }).then((client) => {
        const calendar = google.calendar({version: "v3", auth: client});

        calendar.events.list({
          calendarId: "primary",
          timeMin: (new Date()).toISOString(),
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

  this.getFreeBusy = (timeMin, timeMax, lectureCalendarId) => {
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
        console.log(res.data.calendars);
        console.log(res.data.calendars.primary);
        resolve(res.data.calendars);
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

  return this;
};
