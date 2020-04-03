
const messageResponse = require("../../__fixtures__/watsonAssistant/watsonContextResponse");
const messageResponseAllTimes = require("../../__fixtures__/watsonAssistant/AllTimeResponse");
const messageResponseNoTimes = require("../../__fixtures__/watsonAssistant/NoTimeResponse");
let sendAbsent;

beforeEach(() => {
  sendAbsent= require("./sendAbsent")();
  jest.resetModules();
});

describe("watsonAssistant createSession ", () => {
  test("if data gets fetched if only query specified", () => {
    sendAbsent.convertEntityDates(messageResponse);
    expect(sendAbsent.startAbsentTime).toBe("13:00:00");
    expect(sendAbsent.endAbsentTime).toBeNull();
    expect(sendAbsent.startAbsentDay).toBeNull();
    expect(sendAbsent.endAbsentDay).toBeNull();

    const currentDate = new Date("2020-04-01T11:01:58.135Z");
    realDate = Date;
    global.Date = class extends Date {
      constructor(date) {
        if (date) {
          return super(date);
        }
        return currentDate;
      }
    };
    sendAbsent.setAbsentTimes();
    expect(sendAbsent.startAbsent).toBe("2020-04-01T13:00:00+02:00");
    expect(sendAbsent.endAbsent).toBe("2020-04-01T22:30:00+02:00");
    global.Date = realDate;
  });
  test("if data gets fetched if only query specified", () => {
    sendAbsent.convertEntityDates(messageResponseAllTimes);
    expect(sendAbsent.startAbsentTime).toBe("14:00:00");
    expect(sendAbsent.endAbsentTime).toBe("15:00:00");
    expect(sendAbsent.startAbsentDay).toBe("2020-04-03");
    expect(sendAbsent.endAbsentDay).toBe("2020-04-04");
    sendAbsent.setAbsentTimes();
    expect(sendAbsent.startAbsent).toBe("2020-04-03T14:00:00+02:00");
    expect(sendAbsent.endAbsent).toBe("2020-04-04T15:00:00+02:00");
  });

  test("if data gets fetched if only query specified", () => {
    expect(sendAbsent.absentReason).toBeNull();
    sendAbsent.convertEntityReasons(messageResponseAllTimes);
    expect(sendAbsent.absentReason).toBe("Krankheit");
  });
  test("if data gets fetched if only query specified", () => {
    sendAbsent.convertEntityDates(messageResponseNoTimes);
    expect(sendAbsent.startAbsentTime).toBeNull();
    expect(sendAbsent.endAbsentTime).toBeNull();
    expect(sendAbsent.startAbsentDay).toBeNull();
    expect(sendAbsent.endAbsentDay).toBeNull();

    const currentDate = new Date("2020-04-01T11:01:58.135Z");
    realDate = Date;
    global.Date = class extends Date {
      constructor(date) {
        if (date) {
          return super(date);
        }
        return currentDate;
      }
    };
    sendAbsent.setAbsentTimes();
    expect(sendAbsent.startAbsent).toBe("2020-04-01T06:00:00+02:00");
    expect(sendAbsent.endAbsent).toBe("2020-04-01T22:30:00+02:00");
    global.Date = realDate;
  });
});

