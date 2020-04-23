describe("", () => {
  const sendInputFn = jest.fn().mockResolvedValue({ generic: [{ text: "test_string" }] });
  //  const sendInputFn = jest.fn(() => Promise.resolve({ generic: [{ text: "test_string" }] }));
  jest.resetModules();

  jest.doMock("../watson-assistant/watsonAssistant", () => {
    return function () {
      return {
        sendInput: sendInputFn,
      };
    };
  });

  const Manager = require("./manager");

  let manager;
  const mockSet = jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  });
  const mockReply = jest.fn(() => {});
  const preferences = { set: mockSet, get: () => {} };

  const ctx = { reply: mockReply, callbackQuery: { data: "" } };


  beforeAll(() => {
    manager = new Manager(null);
  });

  test("start", () => {
    manager.start(preferences, null);
    expect(manager.usecases).toBeDefined();
    expect(manager.usecases.start).toBeDefined();
    expect(manager.usecases.absent).toBeDefined();
    expect(manager.usecases.uniNotifier).toBeDefined();
    expect(manager.usecases.tasks).toBeDefined();
    expect(manager.usecases.book).toBeDefined();
    expect(manager.usecases.meals).toBeDefined();
  });
  test("handleTextWithWatsonAssistant", async () => {
    const sampleOnUpdate = jest.fn(() => {});
    manager.usecases["test"] = { onUpdate: sampleOnUpdate };
    try {
      await manager.handleTextWithWatsonAssistant(ctx, "test_string");
    } catch (error) {
      expect(error).not.toBeDefined();
    }
    expect(sampleOnUpdate).toBeCalled();
  });

  test("getTelegramBot", async () => {
    expect(manager.getTelegramBot()).toBeDefined();
  });
});
