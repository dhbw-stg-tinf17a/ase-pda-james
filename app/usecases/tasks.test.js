const msTodo = require("../services/todo");
const gcal = require("../services/gcalendar");
const preferences = require("../services/preferences");
const gsearch = require("../services/gsearch");

jest.mock("../services/gsearch");
jest.mock("../services/gcalendar");
jest.mock("../services/preferences");
jest.mock("../services/todo");

const deleteTodo = jest.fn().mockResolvedValue({});
msTodo.mockImplementation(()=>{
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
        {text: "tasks_show"},
      ],
    };

    ctx = {
      reply: jest .fn(),
      replyWithHTML: jest.fn(),
    };

    return tasks.onUpdate(ctx, waRes).then(()=>{
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

    return tasks.onCallbackQuery(ctx).then(()=>{
      expect(deleteTodo).toHaveBeenCalled();
    });
  });
});
