describe("onUpdate", () => {
  let onUpdate;
  let ctx;
  const replyFunc = jest.fn((message) => message);
  let replyWithAudioFunction;
  let sendAbsentModule;
  let hasUniFunction;
  let sendMailFunction;


  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    replyWithAudioFunction = jest.fn();
    jest.doMock("../services/watsonSpeech", () => {
      return function() {
        return {
          replyWithAudio: replyWithAudioFunction,
        };
      };
    });
    sendAbsentModule = require("./sendabsent")();
    hasUniFunction = jest.fn();
    sendMailFunction = jest.fn().mockRejectedValue("Expected Test Error");
    sendAbsentModule.hasUni = hasUniFunction;
    sendAbsentModule.sendMail = sendMailFunction;
    sendAbsentModule.findPharmacy = jest.fn();
    onUpdate = sendAbsentModule.onUpdate;
    ctx = {
      reply: replyFunc,
    };
  });

  test("switches to welcome watsonSpeech success", async () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
    };
    replyWithAudioFunction.mockResolvedValue();
    hasUniFunction.mockRejectedValue("Expected Test Error");
    await onUpdate(ctx, waRes);
    expect(replyWithAudioFunction).toBeCalledWith({
      reply: replyFunc,
    }, "Warum gehst du nicht in die Uni?");
  });

  test("switches to welcome watsonSpeech fail", async () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
    };
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    hasUniFunction.mockRejectedValue("Expected Test Error");
    await onUpdate(ctx, waRes);
    expect(replyFunc).toBeCalledWith("Warum gehst du nicht in die Uni?");
  });

  test("switches to reason_else watsonSpeech succes", async () => {
    const waRes = {
      generic: [
        {text: "absent_reason_else"},
      ],
      entities: [],
    };
    replyWithAudioFunction.mockResolvedValue();
    hasUniFunction.mockRejectedValue("Expected Test Error");
    await onUpdate(ctx, waRes);
    expect(replyWithAudioFunction).toBeCalledWith({
      reply: replyFunc,
    }, "Wie lange wirst du nicht in die Uni kommen?");
  });

  test("switches to reason_else watsonSpeech fail", async () => {
    const waRes = {
      generic: [
        {text: "absent_reason_else"},
      ],
      entities: [],
    };
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    hasUniFunction.mockRejectedValue("Expected Test Error");
    await onUpdate(ctx, waRes);
    expect(replyFunc).toBeCalledWith("Wie lange wirst du nicht in die Uni kommen?");
  });

  test("switches to reason_sick watsonSpeech success", async () => {
    const waRes = {
      generic: [
        {text: "absent_reason_sick"},
      ],
      entities: [],
    };
    replyWithAudioFunction.mockResolvedValue();
    hasUniFunction.mockRejectedValue("Expected Test Error");

    await onUpdate(ctx, waRes);
    expect(replyWithAudioFunction).toBeCalledWith({
      reply: replyFunc,
    },
    "Das tut mir leid. Gute Besserung");
  });

  test("switches to reason_sick watsonSpeech fail", async () => {
    const waRes = {
      generic: [
        {text: "absent_reason_sick"},
      ],
      entities: [],
    };
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    hasUniFunction.mockRejectedValue("Expected Test Error");
    await onUpdate(ctx, waRes);
    expect(replyFunc).toBeCalledWith("Das tut mir leid. Gute Besserung");
  });

  test("switches to reason_sick watsonSpeech fail", async () => {
    const waRes = {
      generic: [
        {text: "absent_reason_sick"},
      ],
      entities: [],
    };
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    hasUniFunction.mockResolvedValue();
    await onUpdate(ctx, waRes);
    expect(replyFunc).toBeCalledWith("Das tut mir leid. Gute Besserung");
  });

  test("switches to time with absent_reason sick", async () => {
    const waRes = {
      generic: [
        {text: "absent_time"},
      ],
      entities: [],
      context: {absentReason: "Krankheit"},
    };
    replyWithAudioFunction.mockResolvedValue();
    hasUniFunction.mockRejectedValue("Expected Test Error");
    await onUpdate(ctx, waRes);
    expect(replyFunc).toBeCalledWith("Ok");
    expect(replyWithAudioFunction).toBeCalledWith({
      reply: replyFunc,
    },
    "Du hast zu dieser Zeit keine Uni. Aber ich hoffe es geht dir bald besser");
  });

  test("switches to time with absent_reason interview", async () => {
    const waRes = {
      generic: [
        {text: "absent_time"},
      ],
      entities: [],
      context: {absentReason: "Interviews"},
    };
    replyWithAudioFunction.mockResolvedValue();
    hasUniFunction.mockRejectedValue("Expected Test Error");
    await onUpdate(ctx, waRes);
    expect(replyFunc).toBeCalledWith("Ok");
    expect(replyWithAudioFunction).toBeCalledWith({
      reply: replyFunc,
    },
    "Du hast zu dieser Zeit keine Uni. Aber ich wünsche dir viel Erfolg");
  });


  test("switches to time with absent_reason sick", async () => {
    const waRes = {
      generic: [
        {text: "absent_time"},
      ],
      entities: [],
      context: {absentReason: "Krankheit"},
    };
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    hasUniFunction.mockRejectedValue("Expected Test Error");
    await onUpdate(ctx, waRes);
    expect(replyFunc).toBeCalledWith("Ok");
    expect(replyFunc).toBeCalledWith("Du hast zu dieser Zeit keine Uni. Aber ich hoffe es geht dir bald besser");
  });

  test("switches to time with absent_reason interview", async () => {
    const waRes = {
      generic: [
        {text: "absent_time"},
      ],
      entities: [],
      context: {absentReason: "Interviews"},
    };
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    hasUniFunction.mockRejectedValue("Expected Test Error");
    await onUpdate(ctx, waRes);
    expect(replyFunc).toBeCalledWith("Ok");
    expect(replyFunc).toBeCalledWith(
        "Du hast zu dieser Zeit keine Uni. Aber ich wünsche dir viel Erfolg");
  });

  test("switches to time with absent_reason interview", async () => {
    const waRes = {
      generic: [
        {text: "absent_time"},
      ],
      entities: [],
      context: {absentReason: "Interviews"},
    };
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    hasUniFunction.mockResolvedValue();
    await onUpdate(ctx, waRes);
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

    jest.doMock("../utils/sendAbsentHelpers", () => {
      return {
        createEmailText: jest.fn(() => {
          return "emailText";
        }),
        createEmailOptions: jest.fn(() => {
          return {
            recipient: "email@test.de",
            subject: "Abwesenheit",
            htmlText: "emailText",
          };
        }),
        setAbsentTimes: jest.fn(() => {
          return {
            startAbsent: "",
            endAbsent: "",
            startAbsentDay: "",
            endAbsentDay: "",
            startAbsentTime: "",
            endAbsentTime: "",
          };
        }),
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
    getBusySlotsByCalendarIdFunction.mockRejectedValue("Expected Test Error");

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

    replyWithAudioFunction = jest.fn();
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


    jest.doMock("../utils/sendAbsentHelpers", () => {
      return {
        createEmailText: jest.fn(() => {
          return "emailText";
        }),
        createEmailOptions: jest.fn(() => {
          return {
            recipient: "email@test.de",
            subject: "Abwesenheit",
            htmlText: "emailText",
          };
        }),
        setAbsentTimes: jest.fn(() => {
          return {
            startAbsent: "",
            endAbsent: "",
            startAbsentDay: "",
            endAbsentDay: "",
            startAbsentTime: "",
            endAbsentTime: "",
          };
        }),
      };
    });

    sendMail = require("./sendAbsent")().sendMail;
    ctx = {
      reply: replyFunc,
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
    replyWithAudioFunction.mockResolvedValue();
    await sendMail(ctx, waRes);
    expect(replyWithAudioFunction).toHaveBeenCalledWith({reply: replyFunc},
        "Ich habe nun eine Mail an das Sekretariat geschickt. Ich hoffe es geht dir bald besser");
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
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    await sendMail(ctx, waRes);
    expect(replyFunc).toHaveBeenCalledWith(
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
    replyWithAudioFunction.mockResolvedValue();
    await sendMail(ctx, waRes);
    expect(replyWithAudioFunction).toHaveBeenCalledWith({reply: replyFunc},
        "Ich habe nun eine Mail an das Sekretariat geschickt. Ich wünsche dir viel Erfolg");
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
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    await sendMail(ctx, waRes);
    expect(replyFunc).toHaveBeenCalledWith(
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

    sendMailFunction.mockRejectedValue("Expected Test Error");
    replyWithAudioFunction.mockResolvedValue();
    await sendMail(ctx, waRes);
    expect(replyWithAudioFunction).toHaveBeenCalledWith({reply: replyFunc},
        "Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut");
  });

  test("if sendMail send right answer if mail can't be send", async () => {
    const waRes = {
      generic: [
        {text: "absent_welcome"},
      ],
      entities: [],
      context: {absentReason: "Interviews"},
    };

    sendMailFunction.mockRejectedValue("Expected Test Error");
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    await sendMail(ctx, waRes);
    expect(replyFunc).toHaveBeenCalledWith(
        "Ich konnte dem Sekretariat leider keine Mail schicken. Versuche es bitte erneut");
  });
});

describe("findPharmacy", () => {
  let ctx;
  let replyWithAudioFunction;
  let getPlacesFunction;
  let getPlaceByIdFunction;
  let findPharmacy;
  const replyFunc = jest.fn((message) => message);

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    replyWithAudioFunction = jest.fn();
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
    ctx = {
      reply: replyFunc,
    };
  });

  test("if pharmacy gets requested", async () => {
    getPlacesFunction.mockResolvedValue({
      "results": [
        {
          "name": "Apotheke",
        },
      ],
    });
    getPlaceByIdFunction.mockResolvedValue({
      "result":
        {"url": "URL"},
    });
    replyWithAudioFunction.mockResolvedValue();
    await findPharmacy(ctx);
    expect(replyWithAudioFunction).toHaveBeenCalledWith({
      reply: replyFunc,
    },
    "Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:" );
  });

  test("if pharmacy gets requested", async () => {
    getPlacesFunction.mockResolvedValue({
      "results": [
        {
          "name": "Apotheke",
        },
      ],
    });
    getPlaceByIdFunction.mockResolvedValue({
      "result":
          {"url": "URL"},
    });
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    await findPharmacy(ctx);
    expect(replyFunc).toHaveBeenCalledWith(
        "Wenn du Medizin brauchst kannst du zu dieser Apotheke in deiner Nähe gehen:" );
  });

  test("if pharmacy gets requested", async () => {
    getPlacesFunction.mockResolvedValue({
      "results": [
        {
          "name": "Apotheke",
        },
      ],
    });
    getPlaceByIdFunction.mockRejectedValue("Expected Test Error");
    replyWithAudioFunction.mockResolvedValue();
    await findPharmacy(ctx);
    expect(replyFunc).toHaveBeenCalledWith(
        "Apotheke" );
  });

  test("if pharmacy gets requested", async () => {
    getPlacesFunction.mockResolvedValue({
      "results": [
        {
          "name": "Apotheke",
        },
      ],
    });
    getPlaceByIdFunction.mockRejectedValue("Expected Test Error");
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    await findPharmacy(ctx);
    expect(replyFunc).toHaveBeenCalledWith(
        "Apotheke" );
  });

  test("if pharmacy gets requested", async () => {
    getPlacesFunction.mockRejectedValue("Expected Test Error");
    getPlaceByIdFunction.mockResolvedValue();
    replyWithAudioFunction.mockRejectedValue("Expected Test Error");
    await findPharmacy(ctx);
    expect(replyFunc).toHaveBeenCalledWith(
        "Ich konnte leider keine Apotheke finden. Ich hoffe dir geht es trotzdem bald besser" );
  });
  test("if pharmacy gets requested", async () => {
    getPlacesFunction.mockRejectedValue("Expected Test Error");
    getPlaceByIdFunction.mockResolvedValue();
    replyWithAudioFunction.mockResolvedValue();
    await findPharmacy(ctx);
    expect(replyWithAudioFunction).toHaveBeenCalledWith({
      reply: replyFunc,
    },
    "Ich konnte leider keine Apotheke finden. Ich hoffe dir geht es trotzdem bald besser" );
  });
});
