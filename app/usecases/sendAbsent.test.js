
const messageResponse = require("../../__fixtures__/watsonContextResponse");
let sendAbsent;
beforeEach(() => {
  sendAbsent= require("./sendAbsent")();
  jest.resetModules();
});
describe("watsonAssistant createSession ", () => {
  test("if data gets fetched if only query specified", () => {
    // jest.doMock("ibm-watson/assistant/v2", () => {
    //   return function() {
    //     return {
    //       createSession: jest.fn(() => Promise.resolve({result: {session_id: "12345"}})),
    //     };
    //   };
    // });

    sendAbsent.convertEntityDates(messageResponse);
    console.log(sendAbsent.startAbsentTime);
  });
});

