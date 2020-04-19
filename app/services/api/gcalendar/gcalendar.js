const { google } = require("googleapis");
const { busyToFree, calculateTimeUntilEvent } = require("./gcalendar.util");
const moment = require("moment");

/**
 * @typedef {Object} Timeslot
 * @property {string} start
 * @property {string} end
 */

module.exports = function (preferences, oAuth2Client) {
  /**
   * Gets credentials from preferences and puts them into the oAuth2Client
   * @return {Promise<Object>}
   */
  this.addCredentialsToClient = async () => {
    try {
      const credentials = await preferences.get("google_auth_tokens");
      oAuth2Client.credentials = JSON.parse(credentials);

      return oAuth2Client;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Creates a link for users to give access to their Google Account
   * @param {Object} ctx
   */
  this.authenticateUser = (ctx) => {
    preferences.set("chat_id_google_auth", ctx.chat.id).then(() => {
      const url = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/calendar",
      });

      ctx.replyWithHTML(`<a href='${ url }'>Google Authentifizierung</a>`);
    }).catch((err) => {
      console.error(err);
      ctx.reply("Tut mir leid, da ist mir ein Fehler unterlaufen.");
    });
  };

  /**
   * Returns time until the next event from the specified calendar
   * @param {string} calendarId
   * @return {Promise<number>}
   */
  this.getTimeUntilNextEvent = (calendarId) => {
    return new Promise((resolve, reject) => {
      this.addCredentialsToClient().then((client) => {
        const calendar = google.calendar({ version: "v3", auth: client });

        // get next event plus fallback (if event is already happening)
        return calendar.events.list({
          calendarId,
          timeMin: moment().toISOString(),
          maxResults: 2,
          singleEvents: true,
          orderBy: "startTime",
        });
      }).then((res) => {
        const event = res.data.items[0];
        const fallbackEvent = res.data.items[1];

        const timeUntil = calculateTimeUntilEvent(event, fallbackEvent);
        resolve(timeUntil);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  /**
   * Get next 15 events
   * @param {string} calendarId
   * @return {Promise<Object[]>}
   */
  this.getNextEvents = (calendarId) => {
    return new Promise((resolve, reject) => {
      this.addCredentialsToClient().then((client) => {
        const calendar = google.calendar({ version: "v3", auth: client });

        calendar.events.list({
          calendarId,
          timeMin: moment().toISOString(),
          maxResults: 15,
          singleEvents: true,
          orderBy: "startTime",
        }).then((res) => {
          const items = res.data.items.map(({ summary, start, end }) => ({ title: summary, start, end })) || [];
          resolve(items);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  };

  /**
   * Get busy timeslots between timeMin and timeMax from specified calendar
   * @param {string} timeMin
   * @param {string} timeMax
   * @param {string} calendarId
   * @return {Promise<Timeslot[]>}
   */
  this.getBusySlotsByCalendarId = (
      timeMin = moment().toISOString(),
      timeMax = moment().add(1, "d").toISOString(),
      calendarId) => {
    return new Promise((resolve, reject) => {
      this.addCredentialsToClient().then((client) => {
        const calendar = google.calendar({ version: "v3", auth: client });

        return calendar.freebusy.query({
          requestBody: {
            timeMin,
            timeMax,
            items: [
              { id: calendarId },
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

  /**
   * Retrieves a list of all the user's calendars
   * @return {Promise<Object[]>}
   */
  this.getCalendars = () => {
    return new Promise((resolve, reject) => {
      return this.addCredentialsToClient().then((client) => {
        const calendar = google.calendar({ version: "v3", auth: client });

        return calendar.calendarList.list({ showHidden: true });
      }).then((res) => {
        const items = res.data.items.map((item) => {
          return { id: item.id, summary: item.summaryOverride || item.summary };
        }) || [];
        resolve(items);
      }).catch((err) => reject(err));
    });
  };

  /**
   * Returns free slots in given calendar
   * @param {string} lectureCalendarId
   * @param {string} date
   * @return {Promise<Timeslot[]>}
   */
  this.getFreeSlots = (lectureCalendarId, date) => {
    return new Promise((resolve, reject) => {
      if (!lectureCalendarId || !date) {
        reject(new Error("Falsche Paramter"));
      }

      this.addCredentialsToClient().then((client) => {
        const calendar = google.calendar({ version: "v3", auth: client });

        return calendar.freebusy.query({
          requestBody: {
            timeMin: moment(date).format(),
            timeMax: moment(date).endOf("day").format(),
            items: [
              { id: lectureCalendarId },
            ],
          },
        });
      }).then((res) => {
        const calendars = Object.keys(res.data.calendars);
        const freeSlotsByCalendar = calendars.map((calendar) => busyToFree(res.data.calendars[calendar].busy))[0];
        resolve(freeSlotsByCalendar);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  };

  return this;
};
