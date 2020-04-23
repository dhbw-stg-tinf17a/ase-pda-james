const googleapis = jest.genMockFromModule("googleapis");

const google = Object.create(null);

const calendar = jest.fn((params) => ({
  calendarList: {
    list: () => {
      return Promise.resolve({
        data: {
          items: [
            { id: "123", summary: "456" },
            { id: "234", summary: "567" },
          ],
        },
      });
    },
  },
  events: {
    insert: (event) => {
      if (!event) {
        Promise.reject(new Error());
      } else {
        return Promise.resolve({
          data: {
            summary: "Test event",
            start: {
              dateTime: "2020-04-07T10:00:00+02:00",
            },
            end: {
              dateTime: "2020-04-07T11:00:00+02:00",
            },
          },
        });
      }
    },
    list: ({ calendarId }) => {
      if (!calendarId) {
        return Promise.reject(new Error());
      } else {
        return Promise.resolve({
          data: {
            items: [{
              summary: "Test event",
              start: {
                dateTime: "2020-04-07T10:00:00+02:00",
              },
              end: {
                dateTime: "2020-04-07T11:00:00+02:00",
              },
            }],
          },
        });
      }
    },
  },
  freebusy: {
    query: (params) => {
      return Promise.resolve({
        data: {
          calendars: {
            primary: {
              busy: [
                {
                  start: "2020-04-07T10:00:00+02:00",
                  end: "2020-04-07T12:00:00+02:00",
                },
              ],
            },
          },
        },
      });
    },
  },
}));

google.calendar = calendar;

module.exports.google = google;
