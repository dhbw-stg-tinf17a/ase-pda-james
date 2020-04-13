describe("onUpdate", () => {
  let onUpdate;
  let ctx;

  beforeEach(() => {
    onUpdate = require("./sendAbsent")().onUpdate;
    ctx = {
      reply: jest.fn((message) => message),
    };
    watsonSpeech = {
      replyWithAudio: jest.fn((message) => message),
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
    expect(watsonSpeech.replyWithAudio).toBeCalledWith("Warum gehst du nicht in die Uni?");
  });

  test("switches to reason_else ", () => {
    const waRes = {
      generic: [
        {text: "absent_reason_else"},
      ],
      entities: [],
    };

    onUpdate(ctx, waRes);
    expect(watsonSpeech.replyWithAudio).toBeCalledWith("Wie lange wirst du nicht in die Uni kommen?");
  });

  test("switches to time", () => {
    const waRes = {
      generic: [
        {text: "absent_time"},
      ],
      entities: [],
    };

    onUpdate(ctx, waRes);
    expect(ctx.reply).toBeCalledWith("Ok");
  });

  test("switches to default", () => {
    const waRes = {
      generic: [
        {text: "absent_reason_sick"},
      ],
      entities: [],
    };

    onUpdate(ctx, waRes);
    expect(watsonSpeech.replyWithAudio).toBeCalledWith("Das tut mir leid. Gute Besserung");
  });
});
