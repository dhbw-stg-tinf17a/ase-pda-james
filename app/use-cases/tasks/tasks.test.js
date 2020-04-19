const msTodo = require("../../services/api/todo/todo");
const gcal = require("../../services/api/gcalendar/gcalendar");
const preferences = require("../../services/preferences/preferences");
const gsearch = require("../../services/api/gsearch/gsearch");

jest.mock("../../services/api/gsearch/gsearch");
jest.mock("../../services/api/gcalendar/gcalendar");
jest.mock("../../services/preferences/preferences");
jest.mock("../../services/api/todo/todo");

const deleteTodo = jest.fn().mockResolvedValue({});
msTodo.mockImplementation(() => {
  return {
    getTodos: jest.fn().mockResolvedValue([{
      Subject: "test",
    }]),
    deleteTodo,
  };
});


describe("Tasks Test", () => {
  let tasks;
  let ctx;

  beforeEach(() => {
    tasks = require("./tasks")(preferences());
  });

  test("onUpdate calls ctx.reply", () => {
    const waRes = {
      generic: [
        { text: "tasks_show" },
      ],
    };

    ctx = {
      reply: jest.fn(),
      replyWithHTML: jest.fn(),
    };

    return tasks.onUpdate(ctx, waRes).then(() => {
      expect(ctx.reply).toHaveBeenCalled();
    });
  });

  test("onCallbackQuery exercise calls deleteTodo", () => {
    ctx = {
      reply: jest.fn(),
      callbackQuery: {
        data: "tasks_exercise_done",
      },
      editMessageReplyMarkup: jest.fn(),
    };

    return tasks.onCallbackQuery(ctx).then(() => {
      expect(deleteTodo).toHaveBeenCalled();
    });
  });
});
