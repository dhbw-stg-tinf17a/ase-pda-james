// const cal = jest.genMockFromModule("../services/gcalendar")(null, null);
// mport * as cal from "../services/gcalendar"
let meals;


/* jest.mock("../services/gcalendar", () => {
  return {getTimeUntilNextEvent: jest.fn()};
});
*/
describe("meals", () => {
  beforeEach(() => {
    // cal.mockClear();
    // cal = require("../services/gcalendar");
    meals = require("./meals")();
  });

  test("No actual case given edge case", () => {
    const waRes = {generic: [{text: undefined}]};

    const mockCallback = jest.fn((x) => {
    });
    ctx = {reply: mockCallback};
    meals.onUpdate(ctx, waRes);
    expect(mockCallback.mock.calls.length).toBeGreaterThan(0);
  });

  test("meals_start", () => {
    const waRes = {generic: [{text: undefined}]};

    const mockCallback = jest.fn((x) => {
    });
    ctx = {reply: mockCallback};
    meals.onUpdate(ctx, waRes);
    expect(mockCallback.mock.calls.length).toBeGreaterThan(0);
  });

  test("meals_start_with_food", () => {
    const waRes ={generic: [{text: "meals_start_with_food"}]};
    const mockCallback = jest.fn((x) => {
    });
    ctx = {reply: mockCallback};

    try {
      meals.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined;
    }
  });

  test("meals_food_only", () => {
    const waRes ={generic: [{text: "meals_food_only"}]};
    const mockCallback = jest.fn((x) => {
    });
    ctx = {reply: mockCallback};

    try {
      meals.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined;
    }
  });

  test("meals_start", () => {
    const waRes ={generic: [{text: "meals_start"}]};
    const mockCallback = jest.fn((x) => {
    });
    ctx = {reply: mockCallback};

    try {
      meals.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined;
    }
  });

  test("meals_cron", () => {
    const waRes ={generic: [{text: "meals_cron"}]};
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
