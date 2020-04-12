let start;
let mockReply;
let mockSet;

describe("onCallback", () => {
  beforeEach(() => {
    mockSet = jest.fn((key, data) => {});
    mockReply = jest.fn((msg, param) => {});

    const preferences = {set: mockSet};
    start = require("../usecases/start")(preferences, null, null);
  });

  test("onCallbackQuery(...) sets previously obtained calendar ID", () => {
    const data = "start_cid_test";
    const ctx = {reply: mockReply, callbackQuery: {data: data}};
    start.onCallbackQuery(ctx);

    expect(mockSet).toHaveBeenCalledWith("lecture_cal_id", "test");
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("onCallbackQuery(...) sets previously obtained home stop ID", () => {
    const data = "start_sid_test";
    const ctx = {reply: mockReply, callbackQuery: {data: data}};
    start.onCallbackQuery(ctx);

    expect(mockSet).toHaveBeenCalledWith("home_stop_id", "test");
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("onCallBackQuery(...) sets previously obtained uni stop ID", () => {
    const data = "start_usid_test";
    const ctx = {reply: mockReply, callbackQuery: {data: data}};
    start.onCallbackQuery(ctx);

    expect(mockSet).toHaveBeenCalledWith("uni_stop_id", "test");
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  /*  test("uid", ()=>{
     const data = "start_uid_test";
     const ctx = {reply: mockReply, callbackQuery: {data: data}};
     start.onCallbackQuery(ctx);
     // expect(mockSet.mock.calls.length).toEqual(1);
     // const spy = jest.spyOn(start, "uniAddresses");
     // spy.mockReturnValue({test: "Hauptstraße 1"});
     // expect(mockSet).toHaveBeenCalled();
     // expect(mockReply.mock.calls.length).toEqual(1);
     });*/

  test("uid - catch", () => {
    const data = "start_uid_test";
    const ctx = {reply: mockReply, callbackQuery: {data: data}};
    try {
      start.onCallbackQuery(ctx);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("tid", () => {
    const data = "start_tid_test";
    const ctx = {reply: mockReply, callbackQuery: {data: data}};
    start.onCallbackQuery(ctx);
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockSet).toHaveBeenCalledWith("commute", "test");
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("addr", () => {
    const data = "start_addr_test";
    const ctx = {reply: mockReply, callbackQuery: {data: data}};
    try {
      start.onCallbackQuery(ctx);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("tid - catch", () => {
    const data = "start_tid_test";
    const ctx = {reply: mockReply, callbackQuery: {data: data}};
    try {
      start.onCallbackQuery(ctx);
    } catch (error) {
      expect(error).toBeDefined();
      expect(mockReply.mock.calls.length).toEqual(1);
    }
  });

  test("tid - parameter vss", () => {
    const data = "start_tid_vvs";
    const ctx = {reply: mockReply, callbackQuery: {data: data}};
    start.onCallbackQuery(ctx);
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockSet).toHaveBeenCalledWith("commute", "vvs");
  });
});
describe("onUpdate", () => {
  beforeEach(() => {
    mockSet = jest.fn((key, data) => {

    });

    mockReply = jest.fn((msg, param) => {

    });

    const preferences = {set: mockSet};
    start = require("../usecases/start")(preferences, null, null);
  });

  test("start", () => {
    const waRes = {generic: [{text: "start"}]};
    const ctx = {reply: mockReply};
    start.onUpdate(ctx, waRes);
    // expect(mockSet.mock.calls.length).toEqual(1);
    // expect(mockSet).toHaveBeenCalledWith("lecture_cal_id", "test");
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("start_name", () => {
    const waRes = {generic: [{text: "start_name"}], context: {name: "John"}};
    const ctx = {reply: mockReply};
    start.onUpdate(ctx, waRes);
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockSet).toHaveBeenCalledWith("name", "John");
    expect(mockReply.mock.calls.length).toEqual(1);
    expect(mockReply.mock.calls[0][0]).toContain("John");
  });

  test("start_email", () => {
    const waRes = {generic: [{text: "start_email"}], context: {email: "john@test.com"}};
    const ctx = {reply: mockReply};
    start.onUpdate(ctx, waRes);
    expect(mockSet.mock.calls.length).toEqual(1);
    expect(mockSet).toHaveBeenCalledWith("email", "john@test.com");
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("start_address catch", () => {
    const waRes = {generic: [{text: "start_address"}], context: {address: "Samplestreet 17 SampleCity"}};
    const ctx = {reply: mockReply};
    try {
      start.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("start_address catch reply", () => {
    const waRes = {generic: [{text: "start_address"}], context: {address: "Samplestreet 17 SampleCity"}};
    const ctx = {reply: mockReply};
    try {
      start.onUpdate(ctx, waRes);
    } catch (e) {
      expect(mockReply.calls.length).toEqual(1);
    }
  });

  test("start_uni", () => {
    const waRes = {generic: [{text: "start_uni"}], context: {uni: undefined}};
    const ctx = {reply: mockReply};

    try {
      start.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("start_uni_email", () => {
    const waRes = {generic: [{text: "start_uni_email"}], context: {uni_email: "sek@test.com"}};
    const ctx = {reply: mockReply};

    try {
      start.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
      expect(mockSet.mock.calls.length).toEqual(1);
      expect(mockSet).toHaveBeenCalledWith("uni_email", "sek@test.com");
      expect(mockReply.mock.calls.length).toEqual(1);
    }
  });

  test("start_is_authenticated", () => {
    const waRes = {generic: [{text: "start_is_authenticated"}]};
    const ctx = {reply: mockReply};


    try {
      start.onUpdate(ctx, waRes);
    } catch (e) {
      expect(e).toBeDefined();
      expect(mockReply.mock.calls.length).toEqual(1);
    }
  });

  test("_chooseTravelMethod", () => {
    const ctx = {reply: mockReply};
    start._chooseTravelMethod(ctx);

    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("_setHomeAddress resolve", async () => {
    const ctx = {reply: mockReply};
    start._homeAddresses=[];
    const promise = new Promise(((resolve, reject) => {
      resolve({
        results: [
          {place_id: "a", formatted_address: "test", geometry: {location: {lng: "49.0", lat: "8.0"}}},
          {place_id: "b", formatted_address: "test", geometry: {location: {lng: "49.0", lat: "8.0"}}},
        ],
      });
    }));
    await start._setHomeAddress(promise, ctx);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("_setHomeAddress resolve one address only", async () => {
    const ctx = {reply: mockReply};
    start._homeAddresses=[];
    const promise = new Promise(((resolve, reject) => {
      resolve({
        results: [
          {place_id: "a", formatted_address: "test", geometry: {location: {lng: "49.0", lat: "8.0"}}},
        ],
      });
    }));
    await start._setHomeAddress(promise, ctx);
    expect(mockReply.mock.calls.length).toEqual(1);
  });

  test("_setUniStop(...) resolves with single stop element", async () => {
    const ctx = {reply: mockReply};
    const promise = new Promise((resolve, reject) => {
      resolve({stopID: 4711, name: "Sample Stop"});
    });
    await start._setUniStop(promise, ctx);
    expect(mockReply.mock.calls.length).toEqual(1);
  });
});
