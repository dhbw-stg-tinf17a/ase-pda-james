describe("[UNI NOTIFIER Use Case Tests] onUpdate()", () => {
  let uniNotifier;
  let dialog;

  let mockCtx;
  let mockPrefs;
  let mockWaRes;

  beforeAll(async () => {

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    await uniNotifier.onUpdate();
  })

  beforeEach(() => {
    mockCtx = {
      reply: jest.fn((msg) => msg),
      replyWithHTML: jest.fn((msg) => msg),
    };
    mockPrefs = {
      get: jest.fn((key) => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }),
    };
    mockWaRes = {
      generic: [
        {text: "uniNotifier_welcome"},
      ],
    };

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    dialog = require("./uniNotifier.resp")();
  });

  test("onUpdate() switches to Uni Notifier use case", () => {
    uniNotifier.onUpdate(mockCtx, mockWaRes);
    expect(mockCtx.replyWithHTML).toBeCalledWith(dialog.firstResponse);
  });

  test("onUpdate() requests commute preference and resolves with transit case", () => {
    mockPrefs.get = jest.fn((key) => {
      return new Promise((resolve, reject) => {
        if (key === "commute") resolve("vvs");
        resolve();
      });
    });

    uniNotifier.onUpdate(mockCtx, mockWaRes);
    expect(mockPrefs.get).toBeCalledWith("commute");
  });

  test("onUpdate() requests commute preference and resolves with non-transit case", () => {
    mockPrefs.get = jest.fn((key) => {
      return new Promise((resolve, reject) => {
        if (key === "commute") resolve("driving");
        resolve();
      });
    });

    uniNotifier.onUpdate(mockCtx, mockWaRes);
    expect(mockPrefs.get).toBeCalledWith("commute");
  });

  test("onUpdate() requests lecture calendar preference", async () => {
    mockPrefs.get = jest.fn((key) => {
      return new Promise((resolve, reject) => {
        if (key === "commute") resolve("vvs");
        if (key === "lecture_cal_id") resolve("sample_cal_id");
        resolve();
      });
    });

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    await uniNotifier.onUpdate(mockCtx, mockWaRes);
    console.log(mockPrefs.get.mock.calls);
    expect(mockPrefs.get).toBeCalledWith("lecture_cal_id");
  });

  test("onUpdate() requests next lecture details", async () => {
    const getNextEventsFn = jest.fn(() => [{
      title: "Sample Title",
      start: {dateTime: new Date()},
      end: {dateTime: new Date()},
    }]);
    jest.doMock("../services/gcalendar", () => {
      return function() {
        return {
          getNextEvents: getNextEventsFn,
        };
      };
    });

    uniNotifier = require("./uniNotifier")(mockPrefs, null);
    await uniNotifier.onUpdate(mockCtx, mockWaRes);
    console.log(mockPrefs.get.mock.calls);
  });

  test("onUpdate() goes into transit case", () => {
    const mockData = require("../../__fixtures__/uniNotifier/getTripRespose");

    mockPrefs.get = jest.fn((key) => {
      return new Promise((resolve, reject) => {
        if (key === "commute") resolve("vvs");
        resolve();
      });
    });

    const getTripFn = jest.fn(() => {
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

  });
});
