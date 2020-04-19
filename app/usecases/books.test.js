const springerResponse = require("../../__fixtures__/springerResponse");
const getPlacesResponse = require("../../__fixtures__/gplacesResponse");
const getPlaceByIdResponse = require("../../__fixtures__/gplacesIdResponse");

describe("onUpdate", () => {
  let onUpdate;
  let ctx;
  let books;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    jest.doMock("../services/gplaces", () => {
      return () => ({
        getPlaces: jest.fn().mockResolvedValue(getPlacesResponse),
        getPlaceById: jest.fn().mockResolvedValue(getPlaceByIdResponse),
      });
    });

    jest.doMock("../services/springer", () => {
      return {
        getByKeyword: jest.fn().mockResolvedValue(springerResponse),
      };
    });

    ctx = {
      reply: jest.fn(() => {
        return new Promise((resolve) => resolve());
      }),
      replyWithHTML: jest.fn(() => {
        return new Promise((resolve) => resolve());
      }),
    };

    const preferences = {
      get: jest.fn((key) => {
        if (key === "home_address_coordinates") {
          return Promise.resolve("48.72808750000001, 9.123162299999999");
        } else {
          return Promise.resolve();
        }
      }),
    };

    books = require("./books")(preferences);
    onUpdate = require("./books")(preferences).onUpdate;
  });

  test("switches to welcome", async () => {
    const waRes = {
      generic: [
        { text: "book_welcome" },
      ],
    };

    await onUpdate(ctx, waRes);
    expect(ctx.reply.mock.calls).toHaveLength(1);
  });

  test("switches to which-day", async () => {
    const waRes = {
      generic: [
        { text: "book_which-day" },
      ],
    };

    await onUpdate(ctx, waRes);
    expect(ctx.reply.mock.calls).toHaveLength(1);
  });

  test("switches to slots", async () => {
    // jest.setTimeout(12000);
    const waRes = {
      generic: [
        { text: "book_slots" },
      ],
      context: {
        keyword: "test",
        bookDate: "2020-04-08",
      },
    };

    await onUpdate(ctx, waRes);
    console.log(ctx.reply.mock.calls);
    expect(ctx.reply.mock.calls).toHaveLength(3);
    expect(books.keyword).toEqual("test");
    expect(books.date).toEqual("2020-04-08");
  });

  /* test("switches to default", async () => {
    const waRes = {
      generic: [
        {text: "book_somerandomstuff"},
      ],
    };

    await onUpdate(ctx, waRes);
    expect(ctx.reply).not.toBeCalled();
  }); */
});

describe("onCallbackQuery", () => {
  let onCallbackQuery;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    jest.doMock("../services/mailer", () => {
      return () => ({
        sendMail: jest.fn(),
      });
    });

    const preferences = {
      get: jest.fn((key) => {
        if (key === "email") {
          return Promise.resolve("test@test.com");
        } else {
          return Promise.resolve();
        }
      }),
    };

    onCallbackQuery = require("./books")(preferences).onCallbackQuery;
  });

  test("sends email", async () => {
    const ctx = {
      reply: jest.fn(() => {
        return new Promise((resolve) => resolve());
      }),
      replyWithHTML: jest.fn(() => {
        return new Promise((resolve) => resolve());
      }),
      callbackQuery: { data: "book_yes" },
    };

    await onCallbackQuery(ctx);
    expect(ctx.reply.mock.calls).toHaveLength(2);
  });

  test("does not send email", async () => {
    const ctx = {
      reply: jest.fn(() => {
        return new Promise((resolve) => resolve());
      }),
      replyWithHTML: jest.fn(() => {
        return new Promise((resolve) => resolve());
      }),
      callbackQuery: { data: "book_no" },
    };

    await onCallbackQuery(ctx);
    expect(ctx.reply.mock.calls).toHaveLength(1);
  });
});

describe("formatLibraryInfo", () => {
  let formatLibraryInfo;

  beforeEach(() => {
    formatLibraryInfo = require("./books")().formatLibraryInfo;
  });

  test("creates the right string with parameters", () => {
    const text = formatLibraryInfo({ name: "Bibliothek", address: "Bei mir zu Hause" });

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
      { url: [{ value: "xyz" }], title: "Test article" },
      { url: [{ value: "abc" }], title: "Test article 2" },
    ];

    const text = formatArticleResults(articles);

    expect(text).toBe("<a href=\"xyz\">Test article</a>\n\n<a href=\"abc\">Test article 2</a>");
  });

  test("throws error with false parameters", () => {
    expect(() => formatArticleResults([])).toThrowError("Falsche Parameter");
  });
});

describe("createMarkupButtons", () => {
  let createMarkupButtons;

  beforeEach(() => createMarkupButtons = require("./books")().createMarkupButtons);

  test("creates buttons successfully", () => {
    const buttons = createMarkupButtons();
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveLength(1);
    expect(buttons[0][0]).toHaveProperty("text");
    expect(buttons[0][0]).toHaveProperty("callback_data");
    expect(buttons[0][0].callback_data).toEqual("book_yes");

    expect(buttons[1]).toHaveLength(1);
    expect(buttons[1][0]).toHaveProperty("text");
    expect(buttons[1][0]).toHaveProperty("callback_data");
    expect(buttons[1][0].callback_data).toEqual("book_no");
  });
});
