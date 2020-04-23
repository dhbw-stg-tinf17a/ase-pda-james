jest.mock("axios", () => {
  return {
    post: jest.fn(() => Promise.resolve({
      data: {
        access_token: "sample_token",
        refresh_token: "sample_refresh",
      },
    })),
  };
});

describe("REST Service", () => {
  let mockApp;
  let mockGet;
  let mockSet;
  let mockPrefs;
  let mockReply;
  let mockCtx;
  let mockGetToken;
  let mockOAuth2Client;
  let rest;

  beforeAll(() => {
    mockSet = jest.fn((key) => {
      return new Promise((resolve, reject) => {
        if (key === "ms_todo_token") reject(new Error());
        resolve();
      });
    });

    mockGet = jest.fn((param, cb) => {
      const req = { query: { code: 42 } };
      const res = {};
      if (param === "/mstodo") return cb(req, res);
      if (param === "/oauth2callback") return cb(req, res);
    });

    mockApp = { get: mockGet };
    mockPrefs = { set: mockSet, get: () => {} };
    mockReply = jest.fn(() => {});
    mockCtx = { reply: mockReply };

    mockGetToken = jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          res: {
            data: "",
          },
        });
      });
    });

    mockOAuth2Client = { getToken: mockGetToken };
  });

  beforeEach(() => {
    rest = require("./rest")(mockApp, mockPrefs, mockCtx, mockOAuth2Client);
  });

  test("GET /mstodo gets called", () => {
    expect(mockApp.get).toBeCalled();
  });

  test("GET /mstodo catches error on preference set 'ms_todo_token'", () => {
    mockSet = jest.fn((key) => {
      return new Promise((resolve, reject) => {
        if (key === "ms_todo_token") reject(new Error());
        resolve();
      });
    });
    mockPrefs = { set: mockSet, get: () => {} };
    rest = require("./rest")(mockApp, mockPrefs, mockCtx, mockOAuth2Client);

    try {
      mockApp.get("/mstodo");
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
