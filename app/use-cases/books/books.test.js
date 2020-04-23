const springerResponse = require("../../../test/__fixtures__/springerResponse");
const getPlacesResponse = require("../../../test/__fixtures__/gplacesResponse");
const getPlaceByIdResponse = require("../../../test/__fixtures__/gplacesIdResponse");

describe("onUpdate", () => {
  let onUpdate;
  let ctx;
  let books;
  let replyWithAudioFn;
  let replyWithHtmlFn;
  let replyFn;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    jest.doMock("../../services/api/gplaces/gplaces", () => {
      return () => ({
        getPlaces: jest.fn().mockResolvedValue(getPlacesResponse),
        getPlaceById: jest.fn().mockResolvedValue(getPlaceByIdResponse),
      });
    });

    jest.doMock("../../services/api/springer/springer", () => {
      return {
        getByKeyword: jest.fn().mockResolvedValue(springerResponse),
      };
    });

    replyWithAudioFn = jest.fn();
    jest.doMock("../../modules/watson-speech/watsonSpeech", () => {
      return function () {
        return {
          replyWithAudio: replyWithAudioFn,
        };
      };
    });

    replyFn = jest.fn();
    replyWithHtmlFn = jest.fn();
    ctx = {
      reply: replyFn,
      replyWithHTML: replyWithHtmlFn,
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
    expect(replyWithAudioFn).toBeCalledTimes(1);
    expect(replyWithAudioFn).toBeCalledWith(expect.any(Object), "Zu welchem Thema möchtest du recherchieren?");
  });

  test("switches to which-day", async () => {
    const waRes = {
      generic: [
        { text: "book_which-day" },
      ],
    };

    await onUpdate(ctx, waRes);
    expect(replyWithAudioFn).toBeCalledTimes(1);
    expect(replyWithAudioFn).toBeCalledWith(expect.any(Object), "Wann möchtest du lernen?");
  });

  test("switches to slots", async () => {
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
    expect(replyWithAudioFn).toBeCalledTimes(2);
    expect(replyWithAudioFn).toBeCalledWith(expect.any(Object), "Alles klar! Gib mir einen Moment.");
    expect(replyWithAudioFn).toBeCalledWith(expect.any(Object),
        "Hier sind die ersten fünf Artikel, die ich zu \"test\" gefunden habe.");
    expect(replyWithHtmlFn).toBeCalledTimes(2);
    expect(replyFn).toBeCalledWith("📧 Soll ich dir noch mal eine Zusammenfassung per Email schicken?",
        expect.any(Object));
    expect(books.keyword).toEqual("test");
    expect(books.date).toEqual("2020-04-08");
  });

  test("switches to default", async () => {
    const waRes = {
      generic: [
        { text: "book_somerandomstuff" },
      ],
    };

    await onUpdate(ctx, waRes);
    expect(replyFn).not.toBeCalled();
    expect(replyWithHtmlFn).not.toBeCalled();
    expect(replyWithAudioFn).not.toBeCalled();
  });
});

describe("onCallbackQuery", () => {
  let books;
  let onCallbackQuery;
  let replyWithAudioFn;
  let replyWithHtmlFn;
  let replyFn;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    jest.doMock("../../services/mailer/mailer", () => {
      return () => ({
        sendMail: jest.fn(),
      });
    });

    jest.doMock("./books.util", () => {
      return {
        createEmailText: jest.fn(),
        createEmailOptions: jest.fn(),
      };
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

    replyWithAudioFn = jest.fn();
    jest.doMock("../../modules/watson-speech/watsonSpeech", () => {
      return function () {
        return {
          replyWithAudio: replyWithAudioFn,
        };
      };
    });

    replyFn = jest.fn();
    replyWithHtmlFn = jest.fn();

    books = require("./books")(preferences);
    books.springerRecords = springerResponse.records;
    onCallbackQuery = require("./books")(preferences).onCallbackQuery;
  });

  test("sends email", async () => {
    const ctx = {
      reply: replyFn,
      replyWithHTML: replyWithHtmlFn,
      callbackQuery: { data: "book_yes" },
    };

    await onCallbackQuery(ctx);
    expect(replyWithAudioFn).toBeCalledTimes(2);
    expect(replyWithAudioFn).toBeCalledWith(expect.any(Object),
        "Ich schicke dir eine Email mit den Artikeln und den Öffnungszeiten der Bibliothek.");
    expect(replyWithAudioFn).toBeCalledWith(expect.any(Object),
        "Die Email ist raus. Viel Erfolg beim Lernen!");
  });

  test("does not send email", async () => {
    const ctx = {
      reply: replyFn,
      replyWithHTML: replyWithHtmlFn,
      callbackQuery: { data: "book_no" },
    };

    await onCallbackQuery(ctx);
    expect(replyWithAudioFn).toBeCalledTimes(1);
    expect(replyWithAudioFn).toBeCalledWith(expect.any(Object), "Alles klar! Viel Erfolg beim Lernen!");
    expect(replyFn).toBeCalledWith("👋🏼");
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
