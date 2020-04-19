const findOne = jest.fn(() => new Promise((resolve) => {
  resolve({
    answerToUniverseAndEverything: 42,
  });
}));

const count = jest.fn(() => new Promise((resolve) => {
  resolve(1);
}));

const updateOne = jest.fn(() =>
  new Promise((resolve) => {
    resolve();
  }));

const db = {
  collection: jest.fn(() => {
    return {
      findOne,
      count,
      updateOne,
    };
  }),
};

describe("Preferences", () => {
  let prefs;
  beforeAll(() => {
    prefs = require("./preferences")(db);
  });
  test("get 'notSaved' returns undefined", () => {
    return prefs.get("hallo").then((res) => {
      expect(res).toBe(undefined);
    }).catch(fail);
  });
  test("get 'answerToUniverseAndEverything' returns 42", () => {
    return prefs.get("answerToUniverseAndEverything").then((res) => {
      expect(res).toBe(42);
    }).catch(fail);
  });
  test("set 'example' triggers database updateOne function", () => {
    return prefs.set("example", "1337").then(() => {
      expect(updateOne).toHaveBeenCalled();
    }).catch(fail);
  });
});
