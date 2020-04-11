const axios = require("axios");
// const getTodosResponse = require("../../__fixtures__/todo/getTodos");

const findOne = jest.fn((searchParams)=>new Promise((resolve, reject)=>{
  resolve({
    answerToUniverseAndEverything: 42,
  });
}));

const count = jest.fn((searchParams)=> new Promise((resolve, reject)=>{
  resolve(1);
}));

const updateOne = jest.fn((searchParams, update) =>
  new Promise((resolve, reject)=>{
    resolve();
  }));

const db = {
  collection: jest.fn((colName) => {
    return {
      findOne,
      count,
      updateOne,
    };
  }),
};

describe("Preferences", () => {
  let prefs;
  beforeAll(()=>{
    prefs = require("./preferences")(db);
  });
  test("get 'notSaved' returns undefined", () => {
    prefs.get("hallo").then((res)=>{
      expect(res).toBe(undefined);
    }).catch(fail);
  });
  test("get 'answerToUniverseAndEverything' returns 42", ()=>{
    prefs.get("answerToUniverseAndEverything").then((res)=>{
      expect(res).toBe(42);
    }).catch(fail);
  });
  test("set 'example' triggers database updateOne function", ()=>{
    prefs.set("example", "1337").then(()=>{
      // console.log(db.collection("preferences").count.mock);
      expect(updateOne).toHaveBeenCalled();
    }).catch(fail);
  });
});
