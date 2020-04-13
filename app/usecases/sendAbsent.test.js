describe("onUpdate", () => {
  let onUpdate;
  let ctx;
  let spy;
  const watsonSpeech = require("../services/watsonSpeech")(); ;

  beforeEach(() => {
    jest.resetAllMocks();
    spy = jest.spyOn(watsonSpeech, "replyWithAudio");
    onUpdate = require("./sendAbsent")().onUpdate;
    ctx = {};
  });
  test("switches to welcome", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
    };

    onUpdate(ctx, waRes);
    //   expect(spy).toBeCalledWith({}, "Warum gehst du nicht in die Uni?");
  });

  test("switches to reason_else", () => {
    const waRes = {
      generic: [
        {text: "absent_reason_else"},
      ],
      entities: [],
    };
    onUpdate(ctx, waRes);
    expect(spy).toBeCalledWith({}, "Wie lange wirst du nicht in die Uni kommen?");
  });

  test("switches to default", () => {
    const waRes = {
      generic: [
        {text: "absent_reason_sick"},
      ],
      entities: [],
    };
    onUpdate(ctx, waRes);
    expect(spy).toBeCalledWith({}, "Das tut mir leid. Gute Besserung");
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


describe("onUpdate ctx reply", () => {
  let onUpdate;
  let ctx;

  beforeEach(() => {
    onUpdate = require("./sendAbsent")().onUpdate;
    ctx = {
      reply: jest.fn((message) => message),
    };
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

describe("sendMail", () => {
  let sendMail;
  let spy;
  let spySpeech;
  let ctx;
  const mailer = require("../services/mailer")();
  const watsonSpeech = require("../services/watsonSpeech")();


  beforeEach(() => {
    jest.resetAllMocks();
    spySpeech = jest.spyOn(watsonSpeech, "replyWithAudio");
    sendMail = require("./sendAbsent")().sendMail;
    ctx = {};
  });
  test("if sendMail works if absent reason is sick", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {absentReason: "Krankheit"},
    };
    spy = jest.spyOn(mailer, "sendMail").mockImplementation(() => Promise.resolve());
    // sendMail = require("./sendAbsent")().sendMail;

    sendMail(ctx, waRes);
    expect(spySpeech).toBeCalledWith({},
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

    spy = jest.spyOn(mailer, "sendMail").mockImplementation(() => Promise.resolve());
    // sendMail = require("./sendAbsent")().sendMail;

    sendMail(ctx, waRes);
    expect(spySpeech).toBeCalledWith({},
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

    spy = jest.spyOn(mailer, "sendMail").mockImplementation(() => Promise.reject());


    sendMail(ctx, waRes);
    expect(spySpeech).toBeCalledWith({},
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
    expect(spy).toBeCalledWith({}, "Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:" );
  });
});
