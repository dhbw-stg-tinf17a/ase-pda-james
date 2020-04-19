const searchResponse = require("../../__fixtures__/watsonAssistant/watsonAssistantResponse");
const messageResponse = require("../../__fixtures__/watsonAssistant/watsonContextResponse");
let watsonAssistant;

describe("watsonAssistant createSession ", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("if can create Session and set sessionId", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          createSession: jest.fn(() => Promise.resolve({ result: { session_id: "12345" } })),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.createSession().then((res) => {
      expect(res).toBe("success");
      expect(watsonAssistant.sessionId).toBe("12345");
    });
  });

  test("if rejection from api can be handled", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          createSession: jest.fn(() => Promise.reject(new Error("Could not create session"))),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.createSession().catch((err) => {
      expect(err.message).toBe("Could not create session");
    });
  });
});

describe("watsonAssistant message ", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("if message can be send to api and get result", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          message: jest.fn(() => Promise.resolve(searchResponse)),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.message().then((res) => {
      expect(res).toEqual(messageResponse);
    });
  });

  test("if rejection from api can be handled", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          message: jest.fn(() => Promise.reject(new Error("Couldn't send message"))),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.message().catch((err) => {
      expect(err.message).toBe("Couldn't send message");
    });
  });
});

describe("watsonAssistant deleteSession ", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("if session can be deleted and sessionId set to emtpy string", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          deleteSession: jest.fn(() => Promise.resolve("sessionId deleted")),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    watsonAssistant.sessionId = "12346";
    expect(watsonAssistant.sessionId).toBe("12346");
    return watsonAssistant.deleteSession().then((res) => {
      expect(res).toBe("success");
      expect(watsonAssistant.sessionId).toBe("");
    });
  });
  test("if rejection from api can be handled", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          deleteSession: jest.fn(() => Promise.reject(new Error("Couldn't delete sessionId"))),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    watsonAssistant.sessionId = "12346";
    expect(watsonAssistant.sessionId).toBe("12346");
    return watsonAssistant.deleteSession().catch((err) => {
      expect(err.message).toBe("Couldn't delete sessionId");
      expect(watsonAssistant.sessionId).toBe("12346");
    });
  });
});

describe("watsonAssistant sendInput ", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("if sendInput works if sessionId is not set", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          message: jest.fn(() => Promise.resolve(searchResponse)),
          deleteSession: jest.fn(() => Promise.resolve("")),
          createSession: jest.fn(() => Promise.resolve({ result: { session_id: "12345" } })),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    watsonAssistant.sessionId = null;
    expect(watsonAssistant.sessionId).toBeNull();
    return watsonAssistant.sendInput().then((res) => {
      expect(watsonAssistant.sessionId).toBe("12345");
      expect(res).toEqual(messageResponse);
    });
  });

  test("if sendInput works if sessionId is set and does not create a new sessionId", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          createSession: jest.fn(() => Promise.resolve({ result: { session_id: "12345" } })),
          deleteSession: jest.fn(() => Promise.resolve("sessionId deleted")),
          message: jest.fn(() => Promise.resolve(searchResponse)),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    watsonAssistant.sessionId = "1234";
    expect(watsonAssistant.sessionId).toBe("1234");
    return watsonAssistant.sendInput().then((res) => {
      expect(watsonAssistant.sessionId).toBe("1234");
      expect(res).toEqual(messageResponse);
    });
  });

  test("if a new sessionId gets created if sessionId is invalid", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          createSession: jest.fn(() => Promise.resolve({ result: { session_id: "12345" } })),
          deleteSession: jest.fn(() => Promise.resolve("sessionId deleted")),
          message: jest.fn(() => Promise.reject(new Error("Invalid Session"))),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    watsonAssistant.sessionId = "1234";
    expect(watsonAssistant.sessionId).toBe("1234");
    return watsonAssistant.sendInput().catch((err) => {
      expect(watsonAssistant.sessionId).toBe("12345");
      expect(err.message).toEqual("Invalid Session");
    });
  });
});

describe("watsonAssistant setContext ", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("if context can be set", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          message: jest.fn(() => Promise.resolve(searchResponse)),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.setContext().then((res) => {
      expect(res).toEqual(searchResponse);
    });
  });

  test("if rejection from api can be handled", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function () {
        return {
          message: jest.fn(() => Promise.reject(new Error("Couldn't send message"))),
        };
      };
    });

    watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.setContext().catch((err) => {
      expect(err.message).toBe("Couldn't send message");
    });
  });
});
