describe("Utility Function Tests", () => {
  let util;
  let moment;
  let currentTime;

  beforeAll(() => {
    moment = require("moment");
    currentTime = moment();
  });

  beforeEach(() => {
    util = require("./uniNotifier.util")();
  });

  test("transitLate(...) returns true when on-time connection has already passed", () => {
    const timeParams = {
      currentTime: moment(currentTime),
      depTime: moment(currentTime).subtract(10, "minutes"),
      depBuffer: 10,
    };
    expect(util.transitLate(timeParams)).toBe(true);
  });

  test("nonTransitLate(...) returns false if lecture start is after commute time incl. buffers", () => {
    const timeParams = {
      currentTime: moment(currentTime),
      lectureStart: moment(currentTime).add(1, "hours"),
      commuteDuration: 30,
      arrBuffer: 10,
    };

    expect(util.nonTransitLate(timeParams)).toBe(false);
  });

  test("lectureEndsOnArrival(...) returns true if lecture ends before commute time passes", () => {
    const timeParams = {
      currentTime: moment(currentTime),
      lectureEnd: moment(currentTime).add(15, "minutes"),
      commuteDuration: 30,
      arrBuffer: 10,
    };

    expect(util.lectureEndsOnArrival(timeParams)).toBe(true);
  });

  test("minutesLate(...) calculates correct delay to being on-time", () => {
    const lectureStart = currentTime;
    const arrTime = moment(currentTime).add(20, "minutes");

    expect(util.minutesLate(arrTime, lectureStart)).toEqual(20);
  });

  test("timeToLeave(...) calculates correct number of minutes before connection leaves", () => {
    const connLeaves = moment(currentTime).add(10, "minutes");

    expect(util.timeToLeave(connLeaves, currentTime)).toEqual(10);
  });
});

describe("onUpdate(...) Function Tests (transit, late, attendance possible)", () => {
  let uniNotifier;
  let dialog;

  let mockCtx;
  let mockPrefs;
  let mockWaRes;
  let getNextEventsFn;
  let getTripFn;
  let replyWithAudioFn;

  beforeAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.resetModules();

    dialog = require("./uniNotifier.resp")();

    mockCtx = {
      reply: jest.fn((msg) => msg),
      replyWithHTML: jest.fn((msg) => msg),
    };
    mockPrefs = {
      get: jest.fn((key) => {
        return new Promise((resolve, reject) => {
          if (key === "commute") resolve("vvs");
          if (key === "lecture_cal_id") resolve("sample_cal_id");
          resolve();
        });
      }),
    };

    mockWaRes = {
      generic: [
        { text: "uniNotifier_welcome" },
      ],
    };

    getNextEventsFn = jest.fn(() => [{
      title: "Sample Title",
      start: { dateTime: new Date(2020, 1, 1, 10) },
      end: { dateTime: new Date(2020, 1, 1, 11) },
    }]);
    jest.doMock("../services/gcalendar", () => {
      return function () {
        return {
          getNextEvents: getNextEventsFn,
        };
      };
    });

    const mockData = require("../../__fixtures__/uniNotifier/getTripRespose");
    getTripFn = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve(mockData);
      });
    });
    jest.doMock("../services/vvs/vvs", () => {
      return function () {
        return {
          getTrip: getTripFn,
        };
      };
    });

    replyWithAudioFn = jest.fn((msg) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    });
    jest.doMock("../services/watsonSpeech.js", () => {
      return function () {
        return {
          replyWithAudio: replyWithAudioFn,
        };
      };
    });

    jest.doMock("./uniNotifier.util", () => {
      return function () {
        return {
          lectureEndsOnArrival: () => false,
          transitLate: () => true,
          early: () => false,
          getSpeakableTimes: () => ({
            dep: "", arr: "",
          }),
          printItinerary: () => "",
          minutesLate: () => 0,
          timeToLeave: () => 0,
        };
      };
    });

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    await uniNotifier.onUpdate(mockCtx, mockWaRes);
  });

  test("onUpdate(...) switches to Uni Notifier use case", () => {
    expect(mockCtx.replyWithHTML).toBeCalledWith(dialog.firstResponse);
  });

  test("onUpdate(...) requests commute preference and resolves with transit case", () => {
    expect(mockPrefs.get).toBeCalledWith("commute");
    expect(mockPrefs.get("commute")).resolves.toBe("vvs");
  });

  test("onUpdate(...) requests lecture calendar preference and resolves", () => {
    expect(mockPrefs.get).toBeCalledWith("lecture_cal_id");
    expect(mockPrefs.get("lecture_cal_id")).resolves.toBe("sample_cal_id");
  });

  test("onUpdate(...) requests next lecture details", () => {
    expect(getNextEventsFn).toBeCalled();
  });

  test("onUpdate(...) calls VVS service twice and resolves", () => {
    // test scenario recognizes that on-time connection cannot be met
    expect(getTripFn).toBeCalledTimes(2);
    expect(getTripFn()).resolves.toBeDefined();
  });

  test("onUpdate(...) calls watsonSpeech.replyWithAudio(...)", () => {
    expect(replyWithAudioFn).toBeCalled();
  });

  test("onUpdate(...) replies with HTML three times", () => {
    // initial response, late info, and trip itinerary
    expect(mockCtx.replyWithHTML).toBeCalledTimes(3);
  });
});

describe("onUpdate(...) Function Tests (driving, late, attendance possible)", () => {
  let uniNotifier;
  let dialog;

  let mockCtx;
  let mockPrefs;
  let mockWaRes;
  let getNextEventsFn;
  let getDirectionsFn;
  let replyWithAudioFn;

  beforeAll(async () => {
    jest.resetAllMocks();
    jest.resetModules();
    dialog = require("./uniNotifier.resp")();

    mockCtx = {
      reply: jest.fn((msg) => msg),
      replyWithHTML: jest.fn((msg) => msg),
    };
    mockPrefs = {
      get: jest.fn((key) => {
        return new Promise((resolve, reject) => {
          if (key === "commute") resolve("driving");
          if (key === "lecture_cal_id") resolve("sample_cal_id");
          resolve();
        });
      }),
    };
    mockWaRes = {
      generic: [
        { text: "uniNotifier_welcome" },
      ],
    };

    getNextEventsFn = jest.fn(() => [{
      title: "Sample Title",
      start: { dateTime: new Date(2020, 1, 1, 10) },
      end: { dateTime: new Date(2020, 1, 1, 11) },
    }]);
    jest.doMock("../services/gcalendar", () => {
      return function () {
        return {
          getNextEvents: getNextEventsFn,
        };
      };
    });

    getDirectionsFn = jest.fn((query) => {
      return new Promise((resolve, reject) => {
        resolve({
          duration: "10 Minuten",
        });
      });
    });
    jest.doMock("../services/gmaps", () => {
      return {
        getDirections: getDirectionsFn,
        getGoogleMapsRedirectionURL: () => "Sample URL",
      };
    });

    replyWithAudioFn = jest.fn((msg) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    });

    jest.doMock("../services/watsonSpeech.js", () => {
      return function () {
        return {
          replyWithAudio: replyWithAudioFn,
        };
      };
    });

    jest.doMock("./uniNotifier.util", () => {
      return function () {
        return {
          lectureEndsOnArrival: () => false,
          nonTransitLate: () => true,
          early: () => false,
          getSpeakableTimes: () => ({
            dep: "", arr: "",
          }),
          getSpeakableDeparture: () => false,
          minutesLate: () => 0,
        };
      };
    });

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    await uniNotifier.onUpdate(mockCtx, mockWaRes);
  });

  test("onUpdate(...) switches to Uni Notifier use case", () => {
    expect(mockCtx.replyWithHTML).toBeCalledWith(dialog.firstResponse);
  });

  test("onUpdate(...) requests commute preference and resolves with driving case", () => {
    expect(mockPrefs.get).toBeCalledWith("commute");
    expect(mockPrefs.get("commute")).resolves.toBe("driving");
  });

  test("onUpdate(...) requests lecture calendar preference and resolves", () => {
    expect(mockPrefs.get).toBeCalledWith("lecture_cal_id");
    expect(mockPrefs.get("lecture_cal_id")).resolves.toBe("sample_cal_id");
  });

  test("onUpdate(...) requests next lecture details", async () => {
    expect(getNextEventsFn).toBeCalled();
  });


  test("onUpdate(...) calls Google Maps service and resolves with duration parameter", () => {
    expect(getDirectionsFn).toBeCalled();
    expect(getDirectionsFn("Stuttgart Hauptbahnhof")).resolves.toBeDefined();
    expect(getDirectionsFn("Stuttgart Hauptbahnhof")).resolves.toHaveProperty("duration");
  });

  test("onUpdate(...) calls watsonSpeech.replyWithAudio", () => {
    expect(replyWithAudioFn).toBeCalled();
  });

  test("onUpdate(...) replies with HTML three times", () => {
    // initial response, late information, Google Maps route URL
    expect(mockCtx.replyWithHTML).toBeCalledTimes(3);
  });
});

describe("onUpdate(...) Function Tests (edge case branches)", () => {
  let uniNotifier;
  let dialog;

  let mockCtx;
  let mockPrefs;
  let mockWaRes;
  let getNextEventsFn;
  let getDirectionsFn;
  let replyWithAudioFn;

  beforeAll(async () => {
    jest.resetAllMocks();
    jest.resetModules();
    dialog = require("./uniNotifier.resp")();

    mockCtx = {
      reply: jest.fn((msg) => msg),
      replyWithHTML: jest.fn((msg) => msg),
    };
    mockPrefs = {
      get: jest.fn((key) => {
        return new Promise((resolve, reject) => {
          if (key === "commute") resolve("driving");
          if (key === "lecture_cal_id") resolve("sample_cal_id");
          resolve();
        });
      }),
    };
    mockWaRes = {
      generic: [
        { text: "uniNotifier_welcome" },
      ],
    };

    getNextEventsFn = jest.fn(() => [{
      title: "Sample Title",
      start: { dateTime: new Date(2020, 1, 1, 10) },
      end: { dateTime: new Date(2020, 1, 1, 11) },
    }]);
    jest.doMock("../services/gcalendar", () => {
      return function () {
        return {
          getNextEvents: getNextEventsFn,
        };
      };
    });

    getDirectionsFn = jest.fn((query) => {
      return new Promise((resolve, reject) => {
        resolve({
          duration: "10 Minuten",
        });
      });
    });
    jest.doMock("../services/gmaps", () => {
      return {
        getDirections: getDirectionsFn,
        getGoogleMapsRedirectionURL: () => "Sample URL",
      };
    });

    replyWithAudioFn = jest.fn((msg) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    });

    jest.doMock("../services/watsonSpeech.js", () => {
      return function () {
        return {
          replyWithAudio: replyWithAudioFn,
        };
      };
    });

    jest.doMock("./uniNotifier.util", () => {
      return function () {
        return {
          lectureEndsOnArrival: () => false,
          nonTransitLate: () => true,
          early: () => false,
          getSpeakableTimes: () => ({
            dep: "", arr: "",
          }),
          getSpeakableDeparture: () => false,
          minutesLate: () => 0,
        };
      };
    });

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
  });

  test("onUpdate(...) does not recognize Uni Notifier use case", async () => {
    // override with invalid Watson Assistant intent
    mockWaRes = {
      generic: [
        { text: "sth_else" },
      ],
    };

    try {
      await uniNotifier.onUpdate(mockCtx, mockWaRes);
    } catch (error) {
      return expect(error).toBeDefined();
    }
  });

  test("onUpdate(...) recognizes invalid commute preference", async () => {
    // restore correct Watson Assistant Intent
    mockWaRes = {
      generic: [
        { text: "uniNotifier_welcome" },
      ],
    };

    // override preferences to return invalid commute method
    mockPrefs = {
      get: jest.fn((key) => {
        return new Promise((resolve, reject) => {
          if (key === "commute") resolve("swimming");
          resolve();
        });
      }),
    };

    // re-initialize uniNotifier function with updated parameters
    uniNotifier = require("./uniNotifier")(mockPrefs, null);

    try {
      await uniNotifier.onUpdate(mockCtx, mockWaRes);
    } catch (error) {
      return expect(error).toBeDefined();
    }
  });

  test("onUpdate(...) recognizes no next lectures", async () => {
    // restore preferences to resolve valid commute method
    mockPrefs = {
      get: jest.fn((key) => {
        return new Promise((resolve, reject) => {
          if (key === "commute") resolve("driving");
          resolve();
        });
      }),
    };

    // override Google Calender function to return empty lecture array
    getNextEventsFn = jest.fn(() => []);
    jest.doMock("../services/gcalendar", () => {
      return function () {
        return {
          getNextEvents: getNextEventsFn,
        };
      };
    });

    // re-initialize uniNotifier function with updated parameters
    uniNotifier = require("./uniNotifier")(mockPrefs, null);

    try {
      await uniNotifier.onUpdate(mockCtx, mockWaRes);
    } catch (error) {
      return expect(error).toBeDefined();
    }
  });
});
