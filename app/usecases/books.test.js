jest.mock("../services/mailer");

describe("onUpdate", () => {
  let onUpdate;
  let ctx;

  beforeEach(() => {
    onUpdate = require("./books")().onUpdate;
    ctx = {
      reply: jest.fn((message) => message),
      replyWithHTML: jest.fn((message) => message),
    };
  });

  test("switches to welcome", () => {
    const waRes = {
      generic: [
        {text: "book_welcome"},
      ],
    };

    onUpdate(ctx, waRes);
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

    onUpdate(ctx, waRes);
    expect(ctx.reply).toBeCalledWith("Alles klar! Gib mir einen Moment...");
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

describe("formatLibraryInfo", () => {
  let formatLibraryInfo;

  beforeEach(() => {
    formatLibraryInfo = require("./books")().formatLibraryInfo;
  });

  test("creates the right string with parameters", () => {
    const text = formatLibraryInfo({name: "Bibliothek", address: "Bei mir zu Hause"});

    expect(text).toBe(`
      Die nächste Bibliothek von dir zu Hause ist die "<b>Bibliothek</b>".\nDie Adresse lautet: Bei mir zu Hause.
    `);
  });

  test("throws error with false parameters", () => {
    expect(() => formatLibraryInfo({})).toThrowError("Falsche Parameter");
  });
});

describe("formatArticleResults", () => {
  let formatArticleResults;

  beforeEach(() => formatArticleResults = require("./books")().formatArticleResults);

  test("creates the right string with parameters", () => {
    const articles = [
      {url: [{value: "xyz"}], title: "Test article"},
      {url: [{value: "abc"}], title: "Test article 2"},
    ];

    const text = formatArticleResults(articles);

    expect(text).toBe("<a href=\"xyz\">Test article</a>\n\n<a href=\"abc\">Test article 2</a>");
  });

  test("throws error with false parameters", () => {
    expect(() => formatArticleResults([])).toThrowError("Falsche Parameter");
  });
});
