describe("Pairwise helper", () => {
  let pairwise;

  beforeEach(() => {
    pairwise = require("./calendarHelpers").pairwise;
  });

  test("Should work with empty array", () => {
    let counter = 0;
    pairwise([], () => counter++);

    expect(counter).toEqual(0);
  });

  test("Should work with array length 1", () => {
    let counter = 0;
    pairwise([1], () => counter++);

    expect(counter).toEqual(0);
  });

  test("Should work with array length 2", () => {
    let counter = 0;
    pairwise([1, 2], () => counter++);

    expect(counter).toEqual(1);
  });
});

describe("busyToFree helper", () => {
  let busyToFree;

  beforeEach(() => {
    busyToFree = require("./calendarHelpers").busyToFree;
  });

  test("Should work with empty array", () => {
    const result = busyToFree([]);
    expect(result).toHaveLength(1);
  });

  // TODO: implement functionality and test
  test("Should work with array length 1 (before 10:00)", () => {
    const result = busyToFree([{
      start: "2020-04-07T07:00:00+02:00",
      end: "2020-04-07T08:00:00+02:00",
    }]);

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("start");
    expect(result[0]).toHaveProperty("end");
  });

  test("Should work with array length 1 (after 10:00)", () => {
    const result = busyToFree([{
      start: "2020-04-07T11:00:00+02:00",
      end: "2020-04-07T12:00:00+02:00",
    }]);

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("start");
    expect(result[0]).toHaveProperty("end");
    expect(result[1]).toHaveProperty("start");
    expect(result[1]).toHaveProperty("end");
  });

  test("Should work with array length 2", () => {
    const result = busyToFree([{
      start: "2020-04-07T07:00:00+02:00",
      end: "2020-04-07T08:00:00+02:00",
    }, {
      start: "2020-04-07T09:00:00+02:00",
      end: "2020-04-07T10:00:00+02:00",
    }]);

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("start");
    expect(result[0]).toHaveProperty("end");
  });
});

describe("freeAroundEvent", () => {
  let freeAroundEvent;
  let moment;
  let now;

  beforeEach(() => {
    freeAroundEvent = require("./calendarHelpers").freeAroundEvent;
    moment = require("moment");
    now = moment("2020-04-07");
  });

  test("works if event is before 10:00", () => {
    const freeSlots = freeAroundEvent({start: "2020-04-07T07:00:00+02:00", end: "2020-04-07T08:00:00+02:00"}, now);

    expect(freeSlots).toHaveLength(1);
    expect(freeSlots[0]).toHaveProperty("start");
    expect(freeSlots[0]).toHaveProperty("end");
    expect(freeSlots[0].start).toBe("2020-04-07T08:00:00+02:00");
    expect(freeSlots[0].end).toBe("2020-04-07T17:00:00+02:00");
  });

  test("works if event is at 10:00", () => {
    const freeSlots = freeAroundEvent({start: "2020-04-07T10:00:00+02:00", end: "2020-04-07T11:00:00+02:00"}, now);

    expect(freeSlots).toHaveLength(2);

    expect(freeSlots[0]).toHaveProperty("start");
    expect(freeSlots[0]).toHaveProperty("end");
    expect(freeSlots[1]).toHaveProperty("start");
    expect(freeSlots[1]).toHaveProperty("end");

    expect(freeSlots[0].start).toBe("2020-04-07T09:00:00+02:00");
    expect(freeSlots[0].end).toBe("2020-04-07T10:00:00+02:00");
    expect(freeSlots[1].start).toBe("2020-04-07T11:00:00+02:00");
    expect(freeSlots[1].end).toBe("2020-04-07T17:00:00+02:00");
  });

  test("works if event is after 10:00", () => {
    const freeSlots = freeAroundEvent({start: "2020-04-07T10:05:00+02:00", end: "2020-04-07T11:00:00+02:00"}, now);

    expect(freeSlots).toHaveLength(2);

    expect(freeSlots[0]).toHaveProperty("start");
    expect(freeSlots[0]).toHaveProperty("end");
    expect(freeSlots[1]).toHaveProperty("start");
    expect(freeSlots[1]).toHaveProperty("end");

    expect(freeSlots[0].start).toBe("2020-04-07T09:00:00+02:00");
    expect(freeSlots[0].end).toBe("2020-04-07T10:05:00+02:00");
    expect(freeSlots[1].start).toBe("2020-04-07T11:00:00+02:00");
    expect(freeSlots[1].end).toBe("2020-04-07T17:00:00+02:00");
  });
});

describe("calculateTimeUntilEvent", () => {
  let calculateTimeUntilEvent;
  let moment;

  beforeEach(() => {
    calculateTimeUntilEvent = require("./calendarHelpers").calculateTimeUntilEvent;
    moment = require("moment");
  });

  test("works with date", () => {
    const event = {
      start: {
        date: "2020-04-08",
      },
      end: {
        date: "2020-04-08",
      },
    };

    const fallbackEvent = {
      start: {
        date: "2020-04-09",
      },
      end: {
        date: "2020-04-09",
      },
    };

    const now = moment("2020-04-07", "YYYY-MM-DD");

    const timeUntil = calculateTimeUntilEvent(event, fallbackEvent, now);

    expect(timeUntil).toBe(1440); // = 24 hours
  });

  test("works with date and fallback", () => {
    const event = {
      start: {
        date: "2020-04-07",
      },
      end: {
        date: "2020-04-07",
      },
    };

    const fallbackEvent = {
      start: {
        date: "2020-04-08",
      },
      end: {
        date: "2020-04-08",
      },
    };

    const now = moment("2020-04-07", "YYYY-MM-DD");

    const timeUntil = calculateTimeUntilEvent(event, fallbackEvent, now);

    expect(timeUntil).toBe(1440); // = 24 hours
  });

  test("works with dateTime", () => {
    const event = {
      start: {
        dateTime: "2020-04-07T10:00:00+02:00",
      },
      end: {
        dateTime: "2020-04-07T10:30:00+02:00",
      },
    };

    const fallbackEvent = {
      start: {
        date: "2020-04-07T11:00:00+02:00",
      },
      end: {
        date: "2020-04-07T11:30:00+02:00",
      },
    };

    const now = moment("2020-04-07T08:00:00+02:00");

    const timeUntil = calculateTimeUntilEvent(event, fallbackEvent, now);

    expect(timeUntil).toBe(120); // = 2 hours
  });

  test("works with dateTime and fallback", () => {
    const event = {
      start: {
        dateTime: "2020-04-07T10:00:00+02:00",
      },
      end: {
        dateTime: "2020-04-07T10:30:00+02:00",
      },
    };

    const fallbackEvent = {
      start: {
        date: "2020-04-07T11:00:00+02:00",
      },
      end: {
        date: "2020-04-07T11:30:00+02:00",
      },
    };

    const now = moment("2020-04-07T10:00:00+02:00");

    const timeUntil = calculateTimeUntilEvent(event, fallbackEvent, now);

    expect(timeUntil).toBe(60); // = 1 hour
  });
});
