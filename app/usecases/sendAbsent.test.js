describe("onUpdate", () => {
  let onUpdate;
  let ctx;
  const replyFunc = jest.fn((message) => message);
  let replyWithAudioFunction;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    replyWithAudioFunction = jest.fn((ctx, message) => Promise.resolve(ctx, message));
    jest.doMock("../services/watsonSpeech", () => {
      return function() {
        return {
          replyWithAudio: replyWithAudioFunction,
        };
      };
    });

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
    expect(replyWithAudioFunction).toBeCalledWith({
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
    expect(replyWithAudioFunction).toBeCalledWith({
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
    expect(replyWithAudioFunction).toBeCalledWith({
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
  let getBusySlotsByCalendarIdFunction;
  let hasUni;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    getBusySlotsByCalendarIdFunction = jest.fn();
    jest.doMock("../services/gcalendar", () => {
      return function() {
        return {
          getBusySlotsByCalendarId: getBusySlotsByCalendarIdFunction,
        };
      };
    });
    hasUni = require("./sendAbsent")().hasUni;
  });

  test("if rejects when no events get fetched from gcal", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {},
    };
    getBusySlotsByCalendarIdFunction.mockResolvedValue([]);

    return hasUni(waRes)
        .catch((err) => expect(err).toBe(false));
  });

  test("if resolves if gcal request fails", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {},
    };
    getBusySlotsByCalendarIdFunction.mockRejectedValue(new Error("Rejected"));

    return hasUni(waRes)
        .catch((err) => expect(err).toBe(true));
  });

  test("if resolves if events get fteched by gcal", () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {},
    };
    getBusySlotsByCalendarIdFunction.mockResolvedValue(["result1", "result2"]);

    return hasUni(waRes)
        .catch((err) => expect(err).toBe(true));
  });
});


describe("sendMail", () => {
  let sendMail;
  let ctx;
  let mailer;


  const replyFunc = jest.fn((message) => message);
  let replyWithAudioFunction;
  let sendMailFunction;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    replyWithAudioFunction = jest.fn((ctx, message) => Promise.resolve(ctx, message));
    jest.doMock("../services/watsonSpeech", () => {
      return function() {
        return {
          replyWithAudio: replyWithAudioFunction,
        };
      };
    });

    sendMailFunction = jest.fn();
    jest.doMock("../services/mailer", () => {
      return function() {
        return {
          sendMail: sendMailFunction,
        };
      };
    });

    sendMail = require("./sendAbsent")().sendMail;
    ctx = {
      replyWithVoice: replyFunc,
    };
  });

  test("if sendMail works if absent reason is sick", async () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {absentReason: "Krankheit"},
    };
    sendMailFunction.mockResolvedValue();

    await sendMail(ctx, waRes);
    expect(replyWithAudioFunction).toHaveBeenCalledWith({replyWithVoice: replyFunc},
        "Ich habe nun eine Mail an das Sekretariat geschickt. Ich hoffe es geht dir bald besser");
  });

  test("if sendMail works if absent reason is interview", async () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {absentReason: "Interviews"},
    };
    sendMailFunction.mockResolvedValue();

    await sendMail(ctx, waRes);
    expect(replyWithAudioFunction).toHaveBeenCalledWith({replyWithVoice: replyFunc},
        "Ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
  });
  test("if sendMail send right answer if mail can't be send", async () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {absentReason: "Interviews"},
    };

    sendMailFunction.mockRejectedValue();

    await sendMail(ctx, waRes);
    expect(replyWithAudioFunction).toHaveBeenCalledWith({replyWithVoice: replyFunc},
        "Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut");
  });
});

describe("findPharmacy", () => {
  let ctx;
  let replyWithAudioFunction;
  let getPlacesFunction;
  let getPlaceByIdFunction;
  let findPharmacy;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    replyWithAudioFunction = jest.fn((ctx, message) => Promise.resolve(ctx, message));
    jest.doMock("../services/watsonSpeech", () => {
      return function() {
        return {
          replyWithAudio: replyWithAudioFunction,
        };
      };
    });

    getPlacesFunction = jest.fn();
    getPlaceByIdFunction = jest.fn();
    jest.doMock("../services/gplaces", () => {
      return function() {
        return {
          getPlaces: getPlacesFunction,
          getPlaceById: getPlaceByIdFunction,
        };
      };
    });
    findPharmacy = require("./sendAbsent")().findPharmacy;
    ctx = {};
  });

  test("if pharmacy gets requested", async () => {
    getPlacesFunction.mockResolvedValue({
      "results": [
        {
          "name": "Apotheke",
        },
      ],
    });
    getPlaceByIdFunction.mockResolvedValue("URL");

    await findPharmacy(ctx);
    expect(replyWithAudioFunction).toHaveBeenCalledWith({},
        "Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:" );
  });
});
