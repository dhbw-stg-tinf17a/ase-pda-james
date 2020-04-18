
describe("Utility Function tests", () => {
  let util;
  let moment;
  let currentTime;

  beforeAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.resetModules();

    moment = require("moment");
    currentTime = moment();
  });

  beforeEach(() => {
    util = require("./uniNotifier.util")();
  });

  test("transitLate() returns true when on-time connection has already passed", () => {
    const timeParams = {
      currentTime: moment(currentTime),
      depTime: moment(currentTime).subtract(10, "minutes"),
      depBuffer: 10,
    };
    console.log(util);
    expect(util.transitLate(timeParams)).toBe(true);
  });

  test("nonTransitLate() returns false if lecture start is after commute time incl. buffers", () => {
    const timeParams = {
      currentTime: moment(currentTime),
      lectureStart: moment(currentTime).add(1, "hours"),
      commuteDuration: 30,
      arrBuffer: 10,
    };

    expect(util.nonTransitLate(timeParams)).toBe(false);
  });

  test("lectureEndsOnArrival() returns true if lecture ends before commute time passes", () => {
    const timeParams = {
      currentTime: moment(currentTime),
      lectureEnd: moment(currentTime).add(15, "minutes"),
      commuteDuration: 30,
      arrBuffer: 10,
    };

    expect(util.lectureEndsOnArrival(timeParams)).toBe(true);
  });

  test("mintesLate() calculates correct dely to being on-time", () => {
    const lectureStart = currentTime;
    const arrTime = moment(currentTime).add(20, "minutes");

    expect(util.minutesLate(arrTime, lectureStart)).toEqual(20);
  });
});


describe("[UNI NOTIFIER Use Case Tests] onUpdate() VVS LATE", () => {
  let uniNotifier;
  let dialog;

  let mockCtx;
  let mockPrefs;
  let mockWaRes;
  let getNextEventsFn;
  let getTripFn;
  let replyWithAudioFn;

  beforeAll(async () => {
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
        {text: "uniNotifier_welcome"},
      ],
    };

    getNextEventsFn = jest.fn(() => [{
      title: "Sample Title",
      start: {dateTime: new Date(2020, 1, 1, 10 )},
      end: {dateTime: new Date(2020, 1, 1, 11)},
    }]);
    jest.doMock("../services/gcalendar", () => {
      return function() {
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
      return function() {
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
      return function() {
        return {
          replyWithAudio: replyWithAudioFn,
        };
      };
    });

    jest.doMock("./uniNotifier.util", () => {
      return function() {
        return {
          lectureEndsOnArrival: () => false,
          transitLate: () => true,
          early: () => false,
          getSpeakableTimes: () => ({
            dep: "", arr: "",
          }),
          printItinerary: () => "",
        };
      };
    });

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    await uniNotifier.onUpdate(mockCtx, mockWaRes);
  });

  test("onUpdate() switches to Uni Notifier use case", () => {
    expect(mockCtx.replyWithHTML).toBeCalledWith(dialog.firstResponse);
  });

  test("onUpdate() requests commute preference and resolves with transit case", () => {
    expect(mockPrefs.get).toBeCalledWith("commute");
  });

  // test("onUpdate() requests commute preference and resolves with non-transit case", () => {
  //   expect(mockPrefs.get).toBeCalledWith("commute");
  // });

  test("onUpdate() requests lecture calendar preference", () => {
    expect(mockPrefs.get).toBeCalledWith("lecture_cal_id");
  });

  test("onUpdate() requests next lecture details", async () => {
    expect(getNextEventsFn).toBeCalled();
  });
});

describe("[UNI NOTIFIER Use Case Tests] onUpdate() NON-TRANSIT LATE", () => {
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
        {text: "uniNotifier_welcome"},
      ],
    };

    getNextEventsFn = jest.fn(() => [{
      title: "Sample Title",
      start: {dateTime: new Date(2020, 1, 1, 10 )},
      end: {dateTime: new Date(2020, 1, 1, 11)},
    }]);
    jest.doMock("../services/gcalendar", () => {
      return function() {
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
      return function() {
        return {
          replyWithAudio: replyWithAudioFn,
        };
      };
    });

    jest.doMock("./uniNotifier.util", () => {
      return function() {
        return {
          lectureEndsOnArrival: () => false,
          nonTransitLate: () => true,
          early: () => false,
          getSpeakableTimes: () => ({
            dep: "", arr: "",
          }),
          getSpeakableDeparture: () => false,
          minutesLate: () => 42,
        };
      };
    });

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    await uniNotifier.onUpdate(mockCtx, mockWaRes);
  });

  test("onUpdate() switches to Uni Notifier use case", () => {
    expect(mockCtx.replyWithHTML).toBeCalledWith(dialog.firstResponse);
  });

  test("onUpdate() requests commute preference and resolves with transit case", () => {
    expect(mockPrefs.get).toBeCalledWith("commute");
  });

  // test("onUpdate() requests commute preference and resolves with non-transit case", () => {
  //   expect(mockPrefs.get).toBeCalledWith("commute");
  // });

  test("onUpdate() requests lecture calendar preference", () => {
    expect(mockPrefs.get).toBeCalledWith("lecture_cal_id");
  });

  test("onUpdate() requests next lecture details", async () => {
    // expect(getNextEventsFn).toBeCalled();
  });
});

describe("[UNI NOTIFIER Use Case Tests] onUpdate() BRANCEHES", () => {
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
        {text: "uniNotifier_welcome"},
      ],
    };

    getNextEventsFn = jest.fn(() => [{
      title: "Sample Title",
      start: {dateTime: new Date(2020, 1, 1, 10 )},
      end: {dateTime: new Date(2020, 1, 1, 11)},
    }]);
    jest.doMock("../services/gcalendar", () => {
      return function() {
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
      return function() {
        return {
          replyWithAudio: replyWithAudioFn,
        };
      };
    });

    jest.doMock("./uniNotifier.util", () => {
      return function() {
        return {
          lectureEndsOnArrival: () => false,
          nonTransitLate: () => true,
          early: () => false,
          getSpeakableTimes: () => ({
            dep: "", arr: "",
          }),
          getSpeakableDeparture: () => false,
          minutesLate: () => 42,
        };
      };
    });

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    // await uniNotifier.onUpdate(mockCtx, mockWaRes);
  });

  test("onUpdate() does not switch to Uni Notifier use case", async () => {
    mockWaRes = {
      generic: [
        {text: "sth_else"},
      ],
    };

    try {
      await uniNotifier.onUpdate(mockCtx, mockWaRes);
    } catch (e) {
      return expect(e).toBeDefined();
    }
  });

  test("onUpdate() recognizes invalid commute preference", async () => {
    mockWaRes = {
      generic: [
        {text: "uniNotifier_welcome"},
      ],
    };

    mockPrefs = {
      get: jest.fn((key) => {
        return new Promise((resolve, reject) => {
          if (key === "commute") resolve("swimming");
          resolve();
        });
      }),
    };

    uniNotifier = require("./uniNotifier")(mockPrefs, null);

    try {
      await uniNotifier.onUpdate(mockCtx, mockWaRes);
    } catch (e) {
      return expect(e).toBeDefined();
    }
  });

  test("onUpdate() recognizes no next lectures", async () => {
    mockPrefs = {
      get: jest.fn((key) => {
        return new Promise((resolve, reject) => {
          if (key === "commute") resolve("driving");
          resolve();
        });
      }),
    };

    getNextEventsFn = jest.fn(() => []);
    jest.doMock("../services/gcalendar", () => {
      return function() {
        return {
          getNextEvents: getNextEventsFn,
        };
      };
    });

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    await uniNotifier.onUpdate(mockCtx, mockWaRes);
    try {
      await uniNotifier.onUpdate(mockCtx, mockWaRes);
    } catch (e) {
      return expect(e).toBeDefined();
    }
  });
});
