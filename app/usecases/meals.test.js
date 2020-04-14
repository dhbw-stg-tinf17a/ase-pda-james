// const cal = jest.genMockFromModule("../services/gcalendar")(null, null);
// mport * as cal from "../services/gcalendar"
// jest.mock("../services/gcalendar");
let meals;
let ctx;
const DB_KEY_LAST_FOOD = "meals_last_food";
const mockSet = jest.fn((key, data) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
});

const mockGet = jest.fn((key, data) => {
  return new Promise((resolve, reject) => {
    resolve("data");
  });
});

const mockReply = jest.fn((msg, param) => {
});

const mockCallback = jest.fn((x) => {
});

const preferences = {set: mockSet, get: mockGet};

// jest.mock are hoisted so you can keep imports/require on top
const spy = jest.fn(() => 42);

jest.doMock("../services/gcalendar", () => {
  return jest.fn((preferences)=> {
    this.getTimeUntilNextEvent = () => {
      return new Promise((resolve, reject) => {
        resolve(spy());
      });
    };
    return this;
  });
});

describe("meals", () => {
  beforeEach(() => {
    jest.resetModules();
    ctx = {reply: mockReply};
    meals = require("./meals")(preferences, null);
  });

  test("replyPlaces(...)", () => {
    meals._replyPlaces(ctx, "Pizza", preferences);
    expect(mockSet.mock.calls.length).toBe(1);
    expect(mockSet).toHaveBeenCalledWith(DB_KEY_LAST_FOOD, "Pizza");
    expect(mockReply.mock.calls.length).toBe(1);
  });

  test("replyMealsStart(...)", async () => {
    const promise = new Promise(((resolve, reject) => {
      resolve({
        start: "17",
      });
    }));
    await meals._replyMealsStart(promise, ctx, preferences);
    expect(mockGet.mock.calls.length).toBe(1);
    expect(mockReply.mock.calls.length).toBe(1);
  });

  test("onUpdate(...) default", () => {
    const waRes = {generic: [{text: "abc"}]};
    meals.onUpdate(ctx, waRes);
    expect(mockReply).toHaveBeenCalledWith("Ups, da ist etwas schiefgelaufen...");
  });

  test("onUpdate(...) meals_start", () => {
    const waRes = {generic: [{text: "meals_start"}]};
    meals._replyMealsStart = mockCallback;
    meals.onUpdate(ctx, waRes);
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test("onUpdate(...) meals_start_with_food", () => {
    const waRes = {generic: [{text: "meals_start_with_food"}]};
    const mockCallback = jest.fn((x) => {
    });
    ctx = {reply: mockCallback};

    try {
      meals.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined;
    }
  });

  test("onUpdate(...) meals_food_only", () => {
    const waRes = {generic: [{text: "meals_food_only"}]};
    const mockCallback = jest.fn((x) => {
    });
    ctx = {reply: mockCallback};

    try {
      meals.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined;
    }
  });

  test("onUpdate(...) meals_start", () => {
    const waRes = {generic: [{text: "meals_start"}]};
    const mockCallback = jest.fn((x) => {
    });
    ctx = {reply: mockCallback};

    try {
      meals.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined;
    }
  });

  test("onUpdate(...) meals_cron", () => {
    const waRes = {generic: [{text: "meals_cron"}]};
    const mockCallback = jest.fn((x) => {
    });
    ctx = {reply: mockCallback};

    try {
      meals.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined;
    }
  });
});
