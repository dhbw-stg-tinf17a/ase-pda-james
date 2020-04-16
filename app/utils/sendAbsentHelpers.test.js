

describe("setAbsentTimes", () => {
  const allTime = require("../../__fixtures__/sendAbsentHelpers/allTimes");
  const noTime = require("../../__fixtures__/sendAbsentHelpers/noTime");
  const onlyStartTime = require("../../__fixtures__/sendAbsentHelpers/onlyStartTime");
  const onlyStartTimeAndDay = require("../../__fixtures__/sendAbsentHelpers/onlyStartTimeAndDay");
  const onlyTimeDays = require("../../__fixtures__/sendAbsentHelpers/onlyTimeDays");


  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.mock("moment", () => () => ({format: () => "2020-04-01"}));
    jest.doMock("../services/watsonAssistant", () => {
      return function() {
        return {
          setContext: jest.fn().mockRejectedValue("Expected Test Error"),
        };
      };
    });
    setAbsentTimes = require("./sendAbsentHelpers").setAbsentTimes;
  });

  test("if the entity dates get converted correctly if only start time is in the response", () => {
    const absentTimes = setAbsentTimes(onlyStartTime);
    expect(absentTimes.startAbsent).toBe("2020-04-01T13:00:00+02:00");
    expect(absentTimes.endAbsent).toBe("2020-04-01T22:30:00+02:00");
  });

  test("if the entity dates get converted correctly if all times are in the response", () => {
    const absentTimes = setAbsentTimes(allTime);
    expect(absentTimes.startAbsent).toBe("2020-04-13T13:00:00+02:00");
    expect(absentTimes.endAbsent).toBe("2020-04-15T14:00:00+02:00");
  });

  test("if the entity dates get converted correctly if no times are in the response ", () => {
    const absentTimes = setAbsentTimes(noTime);
    expect(absentTimes.startAbsent).toBe("2020-04-01T06:00:00+02:00");
    expect(absentTimes.endAbsent).toBe("2020-04-01T22:30:00+02:00");
  });

  test("if the entity dates get converted correctly if only start time and day are in the response ", () => {
    const absentTimes = setAbsentTimes(onlyStartTimeAndDay);
    expect(absentTimes.startAbsent).toBe("2020-04-13T13:00:00+02:00");
    expect(absentTimes.endAbsent).toBe("2020-04-13T22:30:00+02:00");
  });

  test("if the entity dates get converted correctly if only start and end days are in the response ", () => {
    const absentTimes = setAbsentTimes(onlyTimeDays);
    expect(absentTimes.startAbsent).toBe("2020-04-13T06:00:00+02:00");
    expect(absentTimes.endAbsent).toBe("2020-04-15T22:30:00+02:00");
  });
});

describe("createEmailOptions", () => {
  let getFunction;
  let preferences;
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    getFunction = jest.fn();
    preferences = {get: getFunction};
    createEmailOptions = require("./sendAbsentHelpers").createEmailOptions;
  });

  test("if the mailOptions get set correctly", async () => {
    getFunction.mockResolvedValue("example1@mail.de");
    const mailOptions = await createEmailOptions(preferences, "Email Text");
    expect(mailOptions.htmlText).toBe("Email Text");
    expect(mailOptions.subject).toBe("Abwesenheit");
    expect(mailOptions.recipient).toBe("example1@mail.de");
  });
});

describe("createEmailText", () => {
  let getFunction;
  let preferences;
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    getFunction = jest.fn();
    preferences = {get: getFunction};
    createEmailText = require("./sendAbsentHelpers").createEmailText;
  });

  test("if the mailText gets set correctly with reason sick", async () => {
    const absentTimes = {
      startAbsentDay: "2020-04-13",
      startAbsentTime: "13:00",
      endAbsentTime: "14:00",
    };
    const absentReason = "Krankheit";
    getFunction.mockResolvedValue("James");
    const mailText = await createEmailText(preferences, absentTimes, absentReason);
    const expectedMailText = `<p>Guten Tag,</p></br>
    <p>Ich kann am 2020-04-13 von 13:00 bis
    14:00 aufgrund von Krankheit die Vorlesungen nicht besuchen.</p></br>
    <p> Mit freundlichen Grüßen</p></br>
    <p>James</p>`;
    expect(mailText).toBe(expectedMailText);
  });

  test("if the mailText gets set correctly with reason interview", async () => {
    const absentTimes = {
      startAbsentDay: "2020-04-13",
      startAbsentTime: "13:00",
      endAbsentTime: "14:00",
    };
    const absentReason = "Interviews";
    getFunction.mockResolvedValue("ASE BOT");
    const mailText = await createEmailText(preferences, absentTimes, absentReason);
    const expectedMailText = `<p>Guten Tag,</p></br>
    <p>Ich kann am 2020-04-13 von 13:00 bis
    14:00 aufgrund eines Interviews die Vorlesungen nicht besuchen.</p></br>
    <p> Mit freundlichen Grüßen</p></br>
    <p>ASE BOT</p>`;
    expect(mailText).toBe(expectedMailText);
  });
});


