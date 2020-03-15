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

  return this;
};

const authenticateUser = (ctx, db, oAuth2Client) => {
  const preferences = require("./preferences")(db);

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

const getNextEvents = (oAuth2Client, db) => {
  return new Promise((resolve, reject) => {
    const preferences = require("./preferences")(db);

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

const getFreeBusy = (oAuth2Client, db, timeMin, timeMax, lectureCalendarId) => {
  return new Promise((resolve, reject) => {
    const preferences = require("./preferences")(db);

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
      resolve(res.data.calendars);
    }).catch((err) => {
      console.error(err);
      reject(err);
    });
  });
};

const createEvent = (oAuth2Client, db, event) => {
  return new Promise((resolve, reject) => {
    const preferences = require("./preferences")(db);

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

// module.exports = {getNextEvents, getFreeBusy, createEvent, authenticateUser};
