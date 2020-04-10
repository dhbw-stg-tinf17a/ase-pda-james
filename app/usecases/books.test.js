jest.mock("../services/gcalendar");

describe("onUpdate", () => {
  let onUpdate;
  let ctx;

  beforeEach(() => {
    onUpdate = require("./books")().onUpdate;
    ctx = {reply: jest.fn((message) => message)};
  });

  test("switches to welcome", () => {
    const waRes = {
      generic: [
        {text: "book_welcome"},
      ],
    };

    onUpdate(ctx, waRes);
    expect(ctx.reply).toBeCalledWith("Öffne den Link, um dich zu authentifizieren.");
    expect(ctx.reply).toBeCalledWith("Zu welchem Thema möchtest du recherchieren?");
  });

  test("switches to which-day", () => {
    const waRes = {
      generic: [
        {text: "book_which-day"},
      ],
    };

    onUpdate(ctx, waRes);
    expect(ctx.reply).toBeCalledWith("Wann möchtest du lernen?");
  });

  test("switches to slots", () => {
    const waRes = {
      generic: [
        {text: "book_slots"},
      ],
      context: {
        keyword: "test",
        bookDate: "2020-04-08",
      },
    };
  });

  test("switches to default", () => {
    const waRes = {
      generic: [
        {text: "book_"},
      ],
    };

    onUpdate(ctx, waRes);
    expect(ctx.reply).not.toBeCalled();
  });
});
