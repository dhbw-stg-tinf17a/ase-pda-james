const axios = require("axios");
jest.mock("axios");


describe("VVS test cases", () => {
  let vvs;

  beforeEach(() => {
    vvs = require("./vvs")();
  });

  test("getStopByKeyword(...) resolves promise", () => {
    const mockRes = require("../../../__fixtures__/vvs/getStopByIdResponse");
    axios.get.mockResolvedValue({data: mockRes});

    const key = "Rotebühlplatz 41, Stuttgart";
    return expect(vvs.getStopByKeyword(key)).resolves.toBeDefined();
  });

  test("getStopByKeyword(...) rejects error due to bad API response", () => {
    const mockRes = require("../../../__fixtures__/vvs/getStopByIdReject");
    axios.get.mockResolvedValue({data: mockRes});

    const key = "Rotebühlplatz 41, Stuttgart";
    return expect(vvs.getStopByKeyword(key)).rejects.toBeDefined();
  });

  test("getStopByKeyword(...) rejects error due to ambivalent keyword", () => {
    const mockRes = require("../../../__fixtures__/vvs/getStopByKeywordAmbivalentReject");
    axios.get.mockResolvedValue({data: mockRes});

    const key = "Im Wiesengrund 40";
    return expect(vvs.getStopByKeyword(key)).rejects.toBeDefined();
  });

  test("getTrip(...) resolves promise", () => {
    const mockRes = require("../../../__fixtures__/vvs/getTripResolve");
    axios.get.mockResolvedValue({data: mockRes});

    const tripParams = {
      originId: 5000355,
      destinationId: 5006056,
    };
    return expect(vvs.getTrip(tripParams)).resolves.toBeDefined();
  });

  test("getTrip(...) rejects error due to invalid query parameters", () => {
    const mockRes = require("../../../__fixtures__/vvs/getTripInvalidParametersReject");
    axios.get.mockResolvedValue({data: mockRes});

    const tripParams = {
      originId: "foo",
      destinationId: "bad",
      // both IDs need to be valid numerical values for the API to resolve properly
    };
    return expect(vvs.getTrip(tripParams)).rejects.toBeDefined();
  });
});
