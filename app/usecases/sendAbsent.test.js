describe("onUpdate", () => {
  let onUpdate;
  let ctx;
  let spy;
  const watsonSpeech = require("../services/watsonSpeech")();
  const replyFunc = jest.fn((message) => message);

  beforeEach(() => {
    jest.resetAllMocks();
    spy = jest.spyOn(watsonSpeech, "replyWithAudio");
    onUpdate = require("./sendAbsent")().onUpdate;
    ctx = {
      reply: replyFunc,
    };
  });
  test("switches to welcome", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
    };

    onUpdate(ctx, waRes);
  });
  test("switches to welcome", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
    };

    onUpdate(ctx, waRes);

    expect(spy).toBeCalledWith({
      reply: replyFunc,
    }, "Warum gehst du nicht in die Uni?");
  });

  test("switches to reason_else", () => {
    const waRes = {
      generic: [
        {text: "absent_reason_else"},
      ],
      entities: [],
    };
    onUpdate(ctx, waRes);
    expect(spy).toBeCalledWith({
      reply: replyFunc,
    }, "Wie lange wirst du nicht in die Uni kommen?");
  });

  test("switches to default", () => {
    const waRes = {
      generic: [
        {text: "absent_reason_sick"},
      ],
      entities: [],
    };
    onUpdate(ctx, waRes);
    expect(spy).toBeCalledWith({
      reply: replyFunc,
    },
    "Das tut mir leid. Gute Besserung");
  });

  test("switches to time", () => {
    const waRes = {
      generic: [
        {text: "absent_time"},
      ],
      entities: [],
      context: {absentReason: "Krankheit"},
    };
    onUpdate(ctx, waRes);
    expect(ctx.reply).toBeCalledWith("Ok");
  });
});


describe("hasUni", () => {
  let hasUni;
  let spy;
  const gcalendar = require("../services/gcalendar")(); ;

  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("if rejects when no events get fetched from gcal", () => {
    console.log("Test");
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {},
    };

    spy = jest.spyOn(gcalendar, "getBusySlotsByCalendarId").mockImplementation(() => Promise.resolve([]));
    hasUni = require("./sendAbsent")().hasUni;

    return hasUni(waRes)
        .catch((err) => expect(err).toBe(false));
  });

  test("if resolves if gcal request fails", () => {
    console.log("Test");
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {},
    };

    spy = jest.spyOn(gcalendar, "getBusySlotsByCalendarId").mockImplementation(() => Promise.reject("Reject"));
    hasUni = require("./sendAbsent")().hasUni;

    return hasUni(waRes)
        .then((res) => expect(res).toBe(true));
  });

  test("if resolves if events get fteched by gcal", () => {
    console.log("Test");
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {},
    };

    spy = jest.spyOn(gcalendar, "getBusySlotsByCalendarId").mockImplementation(() => Promise.resolve(["abc", "abc"]));
    hasUni = require("./sendAbsent")().hasUni;

    return hasUni(waRes)
        .then((res) => expect(res).toBe(true));
  });
});


describe("sendMail", () => {
  let ctx;
  let spy;
  let sendMail;
  const watsonSpeech = require("../services/watsonSpeech")();
  const mailer = require("../services/mailer")();
  const replyFunc = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    jest.resetAllMocks();
    spy = jest.spyOn(watsonSpeech, "replyWithAudio");
    sendMail = require("./sendAbsent")().sendMail;
    ctx = {
      replyWithVoice: replyFunc,
    };
  });

  test("if sendMail works if absent reason is sick", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {absentReason: "Krankheit"},
    };
    mailer.sendMail = jest.fn(() => Promise.resolve());
    sendMail(ctx, waRes);
    expect(spy).toHaveBeenCalledWith({replyWithVoice: replyFunc},
        "Ich habe nun eine Mail an das Sekretariat geschickt. Ich hoffe es geht dir bald besser");
  });

  test("if sendMail works if absent reason is interview", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {absentReason: "Interviews"},
    };
    mailer.sendMail = jest.fn(() => Promise.resolve());

    sendMail(ctx, waRes);
    expect(spy).toHaveBeenCalledWith({replyWithVoice: replyFunc},
        "Ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
  });
  test("if sendMail send right answer if mail can't be send", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {absentReason: "Interviews"},
    };
    mailer.sendMail = jest.fn(() => Promise.reject());

    sendMail(ctx, waRes);
    expect(spy).toHaveBeenCalledWith({replyWithVoice: replyFunc},
        "Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut");
  });
});

describe("findPharmacy", () => {
  let findPharmacy;
  let spy;
  let gplacesSpy;
  let gplacesIdSpy;
  const gplaces = require("../services/gplaces")(); ;
  const watsonSpeech = require("../services/watsonSpeech")(); ;

  beforeEach(() => {
    jest.resetAllMocks();
    spy = jest.spyOn(watsonSpeech, "replyWithAudio");
    ctx = {};
  });

  test("if pharmacy gets requested", () => {
    gplacesSpy = jest.spyOn(gplaces, "getPlaces").mockImplementation(() => Promise.resolve(
        {
          "results": [
            {
              "name": "Apotheke",
            },
          ],
        },
    ));
    gplacesIdSpy = jest.spyOn(gplaces, "getPlaces").mockImplementation(() => Promise.resolve("URL"));
    findPharmacy = require("./sendAbsent")().findPharmacy;
    findPharmacy(ctx);
    expect(spy).toHaveBeenCalledWith({}, "Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:" );
  });
});
