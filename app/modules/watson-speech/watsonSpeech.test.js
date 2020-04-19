// const getTodosResponse = require("../../__fixtures__/todo/getTodos");
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const axios = require("axios");

jest.mock("ibm-watson/auth");
jest.mock("ibm-watson/text-to-speech/v1");
jest.mock("ibm-watson/speech-to-text/v1");
jest.mock("axios");

describe("Watson Speech", () => {
  let watsonSpeech;
  beforeAll(() => {
    watsonSpeech = require("./watsonSpeech")();
  });
  test("t2s synthesize method gets called", () => {
    const t2sMock = {
      synthesize: jest.fn().mockResolvedValue({ result: "streamTest" }),
    };
    TextToSpeechV1.mockImplementation(() => {
      return t2sMock;
    });
    return watsonSpeech.t2s("hallo").then(() => {
      expect(t2sMock.synthesize).toHaveBeenCalled();
    }).catch(fail);
  });

  test("s2t resolves to text", () => {
    const ctxMock = {
      telegram: {
        getFileLink: jest.fn().mockResolvedValue(() => ""),
      },
      message: {
        voice: {
          file_id: "testId",
        },
      },
    };
    axios.get.mockResolvedValue({ data: {
      pipe: jest.fn(() => {

      }),
    } });
    const s2tMock = {
      recognizeUsingWebSocket: jest.fn(() => {
        return {
          on: jest.fn((eventType, callback) => {
            if (eventType === "data") {
              callback({ toString: () => "hi" });
            }
          }),
        };
      }),
    };

    SpeechToTextV1.mockImplementation(() => {
      return s2tMock;
    });
    return watsonSpeech.s2t(ctxMock).then((res) => {
      expect(res).toBe("hi");
    }).catch(fail);
  });
  // test("set 'example' triggers database updateOne function", ()=>{
  //   return prefs.set("example", "1337").then(()=>{
  //     expect(updateOne).toHaveBeenCalled();
  //   }).catch(fail);
  // });
});
