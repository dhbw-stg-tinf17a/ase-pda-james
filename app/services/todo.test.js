const axios = require("axios");
const getTodosResponse = require("../../__fixtures__/todo/getTodosResponse");

const get = jest.fn((key)=>new Promise((resolve, reject)=>{
  resolve("test_value");
}));

const set = jest.fn((key, value)=> new Promise((resolve, reject)=>{
  resolve();
}));

const preferences = {
  get,
  set,
};

jest.mock("axios");
axios.get.mockResolvedValue({data: {
  value: getTodosResponse,
}});

describe("ToDo", () => {
  let todo;
  beforeAll(()=>{
    todo = require("./todo")(preferences);
  });
  test("getTodos returns 3 elements", () => {
    return todo.getTodos().then((todos)=>{
      expect(todos.length).toBe(3);
    }).catch((err)=>{
      console.error(err);
      fail("promise rejection");
    });
  });
  // TODO: commiten und dann sortierung testen
  // test("set 'example' triggers database updateOne function", ()=>{
  //   prefs.set("example", "1337").then(()=>{
  //     // console.log(db.collection("preferences").count.mock);
  //     expect(updateOne).toHaveBeenCalled();
  //   }).catch(fail);
  // });
});
