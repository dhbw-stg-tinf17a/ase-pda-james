const searchResponse = require("../../__fixtures__/watsonAssistant/watsonAssistantResponse");
const messageResponse = require("../../__fixtures__/watsonAssistant/watsonContextResponse");

describe("watsonAssistant createSession ", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("if data gets fetched if only query specified", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function() {
        return {
          createSession: jest.fn(() => Promise.resolve({result: {session_id: "12345"}})),
        };
      };
    });

    const watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.createSession().then((res) => {
      expect(res).toBe("success");
      expect(watsonAssistant.sessionId).toBe("12345");
    });
  });

  test("if data gets fetched if only query specified", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function() {
        return {
          createSession: jest.fn(() => Promise.reject(new Error("Could not create session"))),
        };
      };
    });

    const watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.createSession().catch((err) => {
      expect(err.message).toBe("Could not create session");
    });
  });
});

describe("watsonAssistant message ", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("if data gets fetched if only query specified", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function() {
        return {
          message: jest.fn(() => Promise.resolve(searchResponse)),
        };
      };
    });

    const watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.message().then((res) => {
      expect(res).toEqual(messageResponse);
    });
  });

  test("if data gets fetched if only query specified", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function() {
        return {
          message: jest.fn(() => Promise.reject(new Error("Couldn't send message"))),
        };
      };
    });

    const watsonAssistant = require("./watsonAssistant")();
    return watsonAssistant.message().catch((err) => {
      expect(err.message).toBe("Couldn't send message");
    });
  });
});

describe("watsonAssistant deleteSession ", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("if data gets fetched if only query specified", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function() {
        return {
          deleteSession: jest.fn(() => Promise.resolve("sessionId deleted")),
        };
      };
    });

    const watsonAssistant = require("./watsonAssistant")();
    watsonAssistant.sessionId="12346";
    expect(watsonAssistant.sessionId).toBe("12346");
    return watsonAssistant.deleteSession().then((res) => {
      expect(res).toBe("success");
      expect(watsonAssistant.sessionId).toBe("");
    });
  });
  test("if data gets fetched if only query specified", () => {
    jest.doMock("ibm-watson/assistant/v2", () => {
      return function() {
        return {
          deleteSession: jest.fn(() => Promise.reject(new Error("Couldn't delete sessionId"))),
        };
      };
    });

    const watsonAssistant = require("./watsonAssistant")();
    watsonAssistant.sessionId="12346";
    expect(watsonAssistant.sessionId).toBe("12346");
    return watsonAssistant.deleteSession().catch((err) => {
      expect(err.message).toBe("Couldn't delete sessionId");
      expect(watsonAssistant.sessionId).toBe("12346");
    });
  });
});
