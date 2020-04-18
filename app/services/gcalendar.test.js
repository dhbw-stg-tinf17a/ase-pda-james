const preferencesAuthResponse = require("../../__fixtures__/calendar/preferencesAuthResponse");

// jest.mock("googleapis");

describe("addCredentialsToClient", () => {
  let addCredentialsToClient;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  test("returns client with credentials", async () => {
    const oAuth2Client = {};
    const preferences = {
      get: jest.fn((key) => {
        if (key === "google_auth_tokens") {
          return Promise.resolve(preferencesAuthResponse);
        } else {
          return Promise.reject(new Error());
        }
      }),
    };
    addCredentialsToClient = require("./gcalendar")(preferences, oAuth2Client).addCredentialsToClient;

    const client = await addCredentialsToClient();

    expect(client).toHaveProperty("credentials");
  });

  test("throws error if preferences does not return", async () => {
    const oAuth2Client = {};
    const preferences = {
      get: jest.fn((key) => Promise.reject(new Error())),
    };

    addCredentialsToClient = require("./gcalendar")(preferences, oAuth2Client).addCredentialsToClient;

    expect.assertions(1);
    try {
      await addCredentialsToClient();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("getCalendars", () => {
  let getCalendars;

  beforeEach(() => {
    jest.doMock("googleapis", () => {
      return {
        google: {
          calendar: jest.fn(() => ({
            calendarList: {
              list: () => {
                return Promise.resolve({
                  data: require("../../__fixtures__/calendar/calendarListResponse"),
                });
              },
            },
          })),
        },
      };
    });

    const oAuth2Client = {};
    const preferences = {
      get: jest.fn((key) => {
        if (key === "google_auth_tokens") {
          return Promise.resolve(preferencesAuthResponse);
        } else {
          return Promise.reject(new Error());
        }
      }),
    };

    getCalendars = require("./gcalendar")(preferences, oAuth2Client).getCalendars;
  });

  test("resolves if there are calendars", () => {
    return getCalendars().then((calendars) => {
      expect(calendars).toBeDefined();
      expect(calendars).toBeInstanceOf(Array);
      expect(calendars[0]).toHaveProperty("id");
      expect(calendars[0]).toHaveProperty("summary");
    });
  });
});

describe("getFreeSlots", () => {
  let getFreeSlots;

  beforeEach(() => {
    const oAuth2Client = {};
    const preferences = {
      get: jest.fn((key) => {
        if (key === "google_auth_tokens") {
          return Promise.resolve(preferencesAuthResponse);
        } else {
          return Promise.reject(new Error());
        }
      }),
    };
    getFreeSlots = require("./gcalendar")(preferences, oAuth2Client).getFreeSlots;
  });

  test("resolves", () => {
    return getFreeSlots().then((slots) => {
      expect(slots).toBeDefined();
    });
  });

  test("rejects", () => {
    return getFreeSlots().catch((error) => {
      expect(error).toBeDefined();
    });
  });
});

describe("getBusySlotsByCalendarId", () => {
  let getBusySlotsByCalendarId;

  beforeEach(() => {
    const oAuth2Client = {};
    const preferences = require("preferences")({});
    getBusySlotsByCalendarId = require("./gcalendar")(preferences, oAuth2Client).getBusySlotsByCalendarId;
  });

  test("resolves", () => {
    return getBusySlotsByCalendarId("", "", "primary").then((slots) => {
      expect(slots).toBeDefined();
    });
  });

  test("rejects with wrong parameters", () => {
    return getBusySlotsByCalendarId("", "").catch((error) => {
      expect(error).toBeDefined();
    });
  });
});

describe("getNextEvents", () => {
  let getNextEvents;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    jest.doMock("googleapis", () => {
      return {
        google: {
          calendar: jest.fn(() => ({
            events: {
              list: ({calendarId}) => {
                if (!calendarId) {
                  return Promise.reject(new Error());
                } else {
                  return Promise.resolve({
                    data: require("../../__fixtures__/calendar/listEventsResponse"),
                  });
                }
              },
            },
          })),
        },
      };
    });

    const oAuth2Client = {};
    const preferences = {
      get: jest.fn((key) => {
        if (key === "google_auth_tokens") {
          return Promise.resolve(preferencesAuthResponse);
        } else {
          return Promise.reject(new Error());
        }
      }),
    };

    getNextEvents = require("./gcalendar")(preferences, oAuth2Client).getNextEvents;
  });

  test("resolves", async () => {
    const events = await getNextEvents("primary");
    expect(events).toBeDefined();
    expect(events).toBeInstanceOf(Array);
    expect(events).toHaveLength(3);
    expect(events[0]).toHaveProperty("title");
    expect(events[0]).toHaveProperty("start");
    expect(events[0]).toHaveProperty("end");
  });

  test("rejects with wrong parameters", async () => {
    expect.assertions(1);

    try {
      await getNextEvents();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
