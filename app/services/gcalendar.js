const {google} = require("googleapis");

const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const opn = require("open");
const destroyer = require("server-destroy");

const keyPath = path.resolve(__dirname, "../..", "gCredentials.json");

let keys = {redirect_uris: [""]};
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}

const oauth2Client = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[0],
);

google.options({auth: oauth2Client});

async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes.join(" "),
    });

    console.log("authorizeUrl", authorizeUrl);

    const server = http
        .createServer(async (req, res) => {
          try {
            if (req.url.indexOf("/oauth2callback") > -1) {
              const qs = new url.URL(req.url, "http://localhost:8000/oauth2callback")
                  .searchParams;
              res.end("Authentication successful! Please return to the console.");
              server.destroy();
              const {tokens} = await oauth2Client.getToken(qs.get("code"));
              oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
              resolve(oauth2Client);
            }
          } catch (e) {
            reject(e);
          }
        })
        .listen(8000, () => {
          // open the browser to the authorize url to start the workflow
          opn(authorizeUrl, {wait: false}).then((cp) => cp.unref());
        });
    destroyer(server);
  });
}

const getNextEvents = () => {
  return new Promise((resolve, reject) => {
    const scopes = ["https://www.googleapis.com/auth/calendar.events.readonly"];
    authenticate(scopes).then((client) => {
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

const getFreeBusy = (timeMin, timeMax, lectureCalendarId) => {
  return new Promise((resolve, reject) => {
    const scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
    authenticate(scopes).then((client) => {
      return google.calendar({version: "v3", auth: client});
    }).then((calendar) => {
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

const createEvent = (event) => {
  return new Promise((resolve, reject) => {
    const scopes = ["https://www.googleapis.com/auth/calendar.events"];

    authenticate(scopes).then((client) => {
      return google.calendar({version: "v3", auth: client});
    }).then((calendar) => {
      return calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => reject(err));
  });
};

module.exports = {getNextEvents, getFreeBusy, createEvent};
