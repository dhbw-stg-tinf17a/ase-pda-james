const axios = require("axios");
const getTodosResponse = require("../../__fixtures__/todo/getTodosResponse");
const chooseFolderResponse = require("../../__fixtures__/todo/chooseFolderResponse");

jest.mock("axios");

describe("ToDo", () => {
  let todo;
  let preferences;
  beforeAll(() => {
  });
  beforeEach(() => {
    preferences = {
      get: jest.fn((key) => new Promise((resolve, reject) => {
        resolve("test_value");
      })),
      set: jest.fn((key, value) => new Promise((resolve, reject) => {
        resolve();
      })),
    };
    todo = require("./todo")(preferences);
  });
  test("getTodos returns 3 elements", () => {
    axios.get.mockResolvedValue({ data: {
      value: getTodosResponse,
    } });

    return todo.getTodos().then((todos) => {
      expect(todos.length).toBe(3);
    }).catch((err) => {
      console.error(err);
      fail("promise rejection");
    });
  });
  test("chooseFolder sends n buttons when user has n ToDo folders", () => {
    const ctx = {
      telegram: {
        sendMessage: jest.fn(),
      },
    };
    const chatId = "123";
    const folderCount = chooseFolderResponse.length;

    axios.get.mockResolvedValue({ data: {
      value: chooseFolderResponse,
    } });

    return todo.chooseFolder(ctx, chatId).then(() => {
      // check if number of buttons is the same as folders exist in ToDo
      expect(ctx.telegram.sendMessage.mock.calls[0][2]
          .reply_markup.inline_keyboard[0].length).toBe(folderCount);
    });
  });

  test("authorizeUser sends link with oAuth2 Elements", () => {
    const ctx = {
      chat: {
        id: "123",
      },
      reply: jest.fn(),
    };

    return todo.authorizeUser(ctx).then(() => {
      expect(ctx.reply.mock.calls[0][0]).toEqual(expect.stringContaining("client_id"));
    });
  });

  test("requestRefresh sets ms_todo_token in prefs", () => {
    axios.post.mockResolvedValue({ data: {
      access_token: "43",
    } });

    return todo.requestRefresh().then(() => {
      expect(preferences.set.mock.calls[0][0]).toBe("ms_todo_token");
    });
  });
});
