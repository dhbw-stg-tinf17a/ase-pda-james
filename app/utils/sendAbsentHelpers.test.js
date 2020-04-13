

describe("setAbsentTimes", () => {
  const allTime = require("../../__fixtures__/sendAbsentHelpers/allTimes");
  const noTime = require("../../__fixtures__/sendAbsentHelpers/noTime");
  const onlyStartTime = require("../../__fixtures__/sendAbsentHelpers/onlyStartTime");
  const onlyStartTimeAndDay = require("../../__fixtures__/sendAbsentHelpers/onlyStartTimeAndDay");
  const onlyTimeDays = require("../../__fixtures__/sendAbsentHelpers/onlyTimeDays");

  beforeEach(() => {
    setAbsentTimes = require("./sendAbsentHelpers").setAbsentTimes;
    jest.mock("moment", () => () => ({format: () => "2020-04-01"}));
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
  beforeEach(() => {
    createEmailOptions = require("./sendAbsentHelpers").createEmailOptions;
  });

  test("if the mailOptions get set correctly", () => {
    const mailOptions = createEmailOptions("Email Text");
    expect(mailOptions.htmlText).toBe("Email Text");
    expect(mailOptions.subject).toBe("Abwesenheit");
  });
});

describe("createEmailText", () => {
  beforeEach(() => {
    createEmailText = require("./sendAbsentHelpers").createEmailText;
  });

  test("if the mailText gets set correctly with reason sick", () => {
    const absentTimes = {
      startAbsentDay: "2020-04-13",
      startAbsentTime: "13:00",
      endAbsentTime: "14:00",
    };
    const absentReason = "Krankheit";
    const mailText = createEmailText(absentTimes, absentReason);
    expect(mailText).toBe(
        `
        <p>Guten Tag,</p></br> 
        <p>Ich kann am 2020-04-13 von 13:00 bis 
        14:00 aufgrund von Krankheit die Vorlesungen nicht besuchen.</p></br>
        <p> Mit freundlichen Grüßen</p></br> 
        <p>undefined</p>
    `,
    );
  });

  test("if the mailText gets set correctly with reason sick", () => {
    const absentTimes = {
      startAbsentDay: "2020-04-13",
      startAbsentTime: "13:00",
      endAbsentTime: "14:00",
    };
    const absentReason = "Interviews";
    const mailText = createEmailText(absentTimes, absentReason);
    expect(mailText).toBe(
        `
        <p>Guten Tag,</p></br> 
        <p>Ich kann am 2020-04-13 von 13:00 bis 
        14:00 aufgrund eines Interviews die Vorlesungen nicht besuchen.</p></br>
        <p> Mit freundlichen Grüßen</p></br> 
        <p>undefined</p>
    `,
    );
  });
});


