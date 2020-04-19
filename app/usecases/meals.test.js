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

let preferences;

// jest.mock are hoisted so you can keep imports/require on top
const spyNumber = jest.fn(() => 42);

jest.doMock("../services/gcalendar", () => {
  return jest.fn((preferences) => {
    this.getTimeUntilNextEvent = () => {
      return new Promise((resolve, reject) => {
        resolve(spyNumber());
      });
    };
    return this;
  });
});

describe("meals", () => {
  beforeEach(() => {
    jest.resetModules();
    ctx = { reply: mockReply };
    meals = require("./meals")(preferences, null);
    preferences = { set: mockSet, get: mockGet };

    // disable watson speech for tests
    meals._replyTextAndSpeech = mockReply;
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

  test("replyMealsStart(...) preferences error", async () => {
    try {
      const promise = new Promise(((resolve, reject) => {
        reject(new Error());
      }));
      await meals._replyMealsStart(promise, ctx, preferences);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("replyMealsStart(...) preferences not set", async () => {
    const promise = new Promise(((resolve, reject) => {
      resolve("17");
    }));

    const replyMealsStartGet = jest.fn((key, data) => {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    });

    await meals._replyMealsStart(promise, ctx, { set: mockSet, get: replyMealsStartGet });
    expect(mockReply).toHaveBeenCalled();
  });

  test("onUpdate(...) default", () => {
    const waRes = { generic: [{ text: "abc" }] };
    meals.onUpdate(ctx, waRes);
    expect(mockReply).toHaveBeenCalledWith("Ups, da ist etwas schiefgelaufen...");
  });

  test("onUpdate(...) meals_start_with_food catch", () => {
    const waRes = { generic: [{ text: "meals_start_with_food" }] };
    try {
      meals.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });


  test("onUpdate(...) meals_food_only", () => {
    const waRes = { generic: [{ text: "meals_food_only" }], entities: [{ value: "Test" }] };
    meals._replyPlaces = mockCallback;
    meals.onUpdate(ctx, waRes);
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledWith(ctx, "Test", preferences);
  });

  test("onUpdate(...) meals_food_only catch", () => {
    const waRes = { generic: [{ text: "meals_food_only" }], entities: null };

    try {
      meals.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("onUpdate(...) meals_start", () => {
    const waRes = { generic: [{ text: "meals_start" }] };
    meals._replyMealsStart = mockCallback;
    meals.onUpdate(ctx, waRes);
    expect(mockCallback).toHaveBeenCalled();
  });
});
