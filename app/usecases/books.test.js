jest.mock("../services/mailer");

describe("onUpdate", () => {
  let onUpdate;
  let ctx;
  let books;

  beforeEach(() => {
    books = require("./books")();
    onUpdate = require("./books")().onUpdate;
    ctx = {
      reply: jest.fn((message) => {
        return new Promise((resolve, reject) => resolve());
      }),
      replyWithHTML: jest.fn((message) => {
        return new Promise((resolve, reject) => resolve());
      }),
    };
  });

  test("switches to welcome", () => {
    const waRes = {
      generic: [
        {text: "book_welcome"},
      ],
    };

    onUpdate(ctx, waRes);
    expect(ctx.reply.mock.calls).toHaveLength(1);
  });

  test("switches to which-day", () => {
    const waRes = {
      generic: [
        {text: "book_which-day"},
      ],
    };

    onUpdate(ctx, waRes);
    expect(ctx.reply.mock.calls).toHaveLength(1);
  });

  test("switches to slots", async () => {
    jest.setTimeout(12000);
    const waRes = {
      generic: [
        {text: "book_slots"},
      ],
      context: {
        keyword: "test",
        bookDate: "2020-04-08",
      },
    };

    const getPlacesMock = jest.fn((id) => {
      return new Promise((resolve, reject) => resolve({}));
    });

    const getPlaceByIdMock = jest.fn((id) => {
      return new Promise((resolve, reject) => resolve({}));
    });

    const gPlaces = jest.doMock("../services/gplaces", () => {
      return jest.fn(() => ({
        getPlaces: getPlacesMock,
        getPlaceById: getPlaceByIdMock,
      }));
    });

    const springer = jest.doMock("../services/springer", () => {
      return jest.fn(() => ({
        getByKeyword: (keyword) => {
          return new Promise((resolve, reject) => resolve({records: []}));
        },
      }));
    });

    await onUpdate(ctx, waRes);
    expect(ctx.reply.mock.calls).toHaveLength(4);
    expect(books.keyword).toEqual("test");
    expect(books.date).toEqual("2020-04-08");
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
