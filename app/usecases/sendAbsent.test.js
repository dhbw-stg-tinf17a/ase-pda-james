
const messageResponse = require("../../__fixtures__/watsonAssistant/watsonContextResponse");
const messageResponseAllTimes = require("../../__fixtures__/watsonAssistant/AllTimeResponse");
const messageResponseNoTimes = require("../../__fixtures__/watsonAssistant/NoTimeResponse");
let sendAbsent;


describe("sendAbsent convertEntityDates", () => {
  beforeEach(() => {
    sendAbsent= require("./sendAbsent")();
  });
  test("if the entity dates get converted correctly if only one sys-time is in the response", () => {
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

  test("if the entity dates get converted correctly if all times are in the response", () => {
    sendAbsent.convertEntityDates(messageResponseAllTimes);
    expect(sendAbsent.startAbsentTime).toBe("14:00:00");
    expect(sendAbsent.endAbsentTime).toBe("15:00:00");
    expect(sendAbsent.startAbsentDay).toBe("2020-04-03");
    expect(sendAbsent.endAbsentDay).toBe("2020-04-04");
    sendAbsent.setAbsentTimes();
    expect(sendAbsent.startAbsent).toBe("2020-04-03T14:00:00+02:00");
    expect(sendAbsent.endAbsent).toBe("2020-04-04T15:00:00+02:00");
  });

  test("if the entity dates get converted correctly if no time entities are in the response ", () => {
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

describe("sendAbsent convertEntityReasons", () => {
  beforeEach(() => {
    sendAbsent= require("./sendAbsent")();
  });
  test("if the entity absentReasons gets converted correctly", () => {
    expect(sendAbsent.absentReason).toBeNull();
    sendAbsent.convertEntityReasons(messageResponseAllTimes);
    expect(sendAbsent.absentReason).toBe("Krankheit");
  });
});

describe("sendAbsent setAbsentTimes", () => {
  beforeEach(() => {
    sendAbsent= require("./sendAbsent")();
  });
  test("if startAbsent/endAbsent get specified correctly if only startAbsentTime specified", () => {
    sendAbsent.startAbsentTime = "13:00:00";
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

  test("if startAbsent/endAbsent get specified correctly everything specified", () => {
    sendAbsent.startAbsentTime ="14:00:00";
    sendAbsent.endAbsentTime="15:00:00";
    sendAbsent.startAbsentDay="2020-04-03";
    sendAbsent.endAbsentDay="2020-04-04";
    expect(sendAbsent.startAbsentTime).toBe("14:00:00");
    expect(sendAbsent.endAbsentTime).toBe("15:00:00");
    expect(sendAbsent.startAbsentDay).toBe("2020-04-03");
    expect(sendAbsent.endAbsentDay).toBe("2020-04-04");
    sendAbsent.setAbsentTimes();
    expect(sendAbsent.startAbsent).toBe("2020-04-03T14:00:00+02:00");
    expect(sendAbsent.endAbsent).toBe("2020-04-04T15:00:00+02:00");
  });

  test("if startAbsent/endAbsent get specified correctly if nothing specified", () => {
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
