let start;
let mockReply;
let mockSet;

describe("onCallback(...) tests", () => {
  beforeEach(() => {
    mockSet = jest.fn((key, data) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    });
    mockReply = jest.fn((msg, param) => {});

    const preferences = { set: mockSet, get: () => {} };
    start = require("../usecases/start")(preferences, null, null);
  });

  test("onCallBackQuery(...) sets previously obtained home address", () => {
    const data = "start_addr_test";
    const ctx = { reply: mockReply, callbackQuery: { data: data } };
    start._homeAddresses = { test: {
      address: "Sample Street",
      location: "49.0, 8.0",
    } };
    start.onCallbackQuery(ctx);

    expect(mockSet.mock.calls.length).toEqual(2);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("onCallbackQuery(...) catches error because of undefined home address", () => {
    const data = "start_addr_test";
    const ctx = { reply: mockReply, callbackQuery: { data: data } };
    try {
      start.onCallbackQuery(ctx);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("onCallbackQuery(...) sets previously obtained travel method", () => {
    const data = "start_tid_test";
    const ctx = { reply: mockReply, callbackQuery: { data: data } };
    start.onCallbackQuery(ctx);
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockSet).toHaveBeenCalledWith("commute", "test");
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("onCallbackQuery(...) catches error because of undefined or invalid travel method", () => {
    const data = "start_tid_test";
    const ctx = { reply: mockReply, callbackQuery: { data: data } };
    try {
      start.onCallbackQuery(ctx);
    } catch (error) {
      expect(error).toBeDefined();
      expect(mockReply.mock.calls.length).toEqual(1);
    }
  });

  test("onCallbackQuery(...) sets previously obtained home stop ID", () => {
    const data = "start_sid_test";
    const ctx = { reply: mockReply, callbackQuery: { data: data } };
    start.onCallbackQuery(ctx);

    expect(mockSet).toHaveBeenCalledWith("home_stop_id", "test");
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("onCallbackQuery(...) sets previously obtained uni address", () => {
    const data = "start_uid_test";
    const ctx = { reply: mockReply, callbackQuery: { data: data } };
    start._uniAddresses = { test: {
      address: "Sample Street",
    } };
    start.onCallbackQuery(ctx);

    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockSet).toHaveBeenCalledWith("uni_address", "Sample Street");
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("onCallbackQuery(...) catches error because of undefined uni address", () => {
    const data = "start_uid_test";
    const ctx = { reply: mockReply, callbackQuery: { data: data } };
    try {
      start.onCallbackQuery(ctx);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("onCallBackQuery(...) sets previously obtained uni stop ID", () => {
    const data = "start_usid_test";
    const ctx = { reply: mockReply, callbackQuery: { data: data } };
    start.onCallbackQuery(ctx);

    expect(mockSet).toHaveBeenCalledWith("uni_stop_id", "test");
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("onCallbackQuery(...) sets previously obtained calendar ID", () => {
    const data = "start_cid_test";
    const ctx = { reply: mockReply, callbackQuery: { data: data } };
    start.onCallbackQuery(ctx);

    expect(mockSet).toHaveBeenCalledWith("lecture_cal_id", "test");
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockReply.mock.calls.length).toEqual(1);
  });
});

describe("onUpdate(...) tests", () => {
  beforeEach(() => {
    mockSet = jest.fn((key, data) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    });
    mockReply = jest.fn((msg, param) => {});

    const preferences = { set: mockSet };
    start = require("../usecases/start")(preferences, null);
  });

  test("onUpdate(...) recognizes dialog start and replies", () => {
    const waRes = { generic: [{ text: "start" }] };
    const ctx = { reply: mockReply };
    start.onUpdate(ctx, waRes);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("onUpdate(...) recognizes and saves input name and replies accordingly", () => {
    const waRes = { generic: [{ text: "start_name" }], context: { name: "John" } };
    const ctx = { reply: mockReply };
    start.onUpdate(ctx, waRes);
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockSet).toHaveBeenCalledWith("name", "John");
    expect(mockReply.mock.calls.length).toEqual(1);
    expect(mockReply.mock.calls[0][0]).toContain("John");
  });

  test("onUpdate(...) recognizes and saves input email address and replies", () => {
    const waRes = { generic: [{ text: "start_email" }], context: { email: "john@test.com" } };
    const ctx = { reply: mockReply };
    start.onUpdate(ctx, waRes);
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockSet).toHaveBeenCalledWith("email", "john@test.com");
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("onUpdate(...) catches error because of non-existing input address and replies", () => {
    const waRes = { generic: [{ text: "start_address" }], context: { address: "Samplestreet 17 SampleCity" } };
    const ctx = { reply: mockReply };
    try {
      start.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
      expect(mockReply.calls.length).toEqual(1);
    }
  });

  test("onUpdate(...) catches error because of undefined input uni", () => {
    const waRes = { generic: [{ text: "start_uni" }], context: { uni: undefined } };
    const ctx = { reply: mockReply };

    try {
      start.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("onUpdate(...) recognizes and saves input secretary email and catches error because of " +
    "impossible Google authentication", () => {
    const waRes = { generic: [{ text: "start_uni_email" }], context: { uni_email: "sek@test.com" } };
    const ctx = { reply: mockReply };

    try {
      start.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
      expect(mockSet.mock.calls.length).toEqual(1);
      expect(mockSet).toHaveBeenCalledWith("uni_email", "sek@test.com");
      expect(mockReply.mock.calls.length).toEqual(1);
    }
  });

  test("onUpdate(...) catches error because of undefined calendars due to no authentication", () => {
    const waRes = { generic: [{ text: "start_is_authenticated" }] };
    const ctx = { reply: mockReply };

    try {
      start.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
      expect(mockReply.mock.calls.length).toEqual(1);
    }
  });
});

describe("Wrapper functions tests", () => {
  beforeEach(() => {
    mockSet = jest.fn((key, data) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    });
    mockReply = jest.fn((msg, param) => {
    });

    const preferences = { set: mockSet };
    start = require("../usecases/start")(preferences, null);
  });

  test("_setHomeAddress(...) resolves with single-element array", async () => {
    const ctx = { reply: mockReply };
    start._homeAddresses = [];
    const promise = new Promise(((resolve, reject) => {
      resolve({
        results: [
          { place_id: "a", formatted_address: "test", geometry: { location: { lng: "49.0", lat: "8.0" } } },
        ],
      });
    }));
    await start._setHomeAddress(promise, ctx);
    expect(mockSet.mock.calls.length).toEqual(2);
  });

  test("_setHomeAddress(...) resolves with multi-element array", async () => {
    const ctx = { reply: mockReply };
    start._homeAddresses = [];
    const promise = new Promise(((resolve, reject) => {
      resolve({
        results: [
          { place_id: "a", formatted_address: "test", geometry: { location: { lng: "49.0", lat: "8.0" } } },
          { place_id: "b", formatted_address: "test", geometry: { location: { lng: "49.0", lat: "8.0" } } },
        ],
      });
    }));
    await start._setHomeAddress(promise, ctx);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("_chooseTravelMethod(...) is called", () => {
    const ctx = { reply: mockReply };
    start._chooseTravelMethod(ctx);

    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("_setStop(...) resolves with single stop element", async () => {
    const ctx = { reply: mockReply };
    const promise = new Promise((resolve, reject) => {
      resolve({ stopID: 4711, name: "Sample Stop" });
    });
    await start._setStop(promise, ctx, "sid", "Haltestelle zuhause");
    expect(mockSet.mock.calls.length).toEqual(1);
  });

  test("_setStop(...) resolves with array", async () => {
    const ctx = { reply: mockReply };
    const promise = new Promise((resolve, reject) => {
      resolve([
        { stopID: 4711, name: "Sample Stop" },
        { stopID: 1337, name: "Yeet Stop" },
      ]);
    });
    await start._setStop(promise, ctx, "sid", "Haltestelle zuhause");
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("_setUniAddress(...) resolves with single-element array", async () => {
    const ctx = { reply: mockReply };
    start._uniAddresses = [];
    const promise = new Promise(((resolve, reject) => {
      resolve({
        results: [
          { place_id: "a", formatted_address: "test" },
          { place_id: "b", formatted_address: "test" },
        ],
      });
    }));
    await start._setUniAddress(promise, ctx);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("_setCalendar(...) resolves with single-element array", async () => {
    const ctx = { reply: mockReply };
    const promise = new Promise(((resolve, reject) => {
      resolve([
        { id: "a", summary: "test" },
        { id: "b", summary: "test" },
      ]);
    }));
    await start._setCalendar(promise, ctx);
    expect(mockReply.mock.calls.length).toEqual(1);
  });
});
