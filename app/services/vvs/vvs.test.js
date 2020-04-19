const axios = require("axios");
jest.mock("axios");


describe("VVS Service: getStopByKeyword(...)", () => {
  let vvs;

  beforeEach(() => {
    vvs = require("./vvs")();
  });

  test("getStopByKeyword(...) resolves promise", () => {
    const mockRes = require("../../../__fixtures__/vvs/getStopByKeywordResponse");
    axios.get.mockResolvedValue({ data: mockRes });

    const key = "Rotebühlplatz 41, Stuttgart";
    return expect(vvs.getStopByKeyword(key)).resolves.toBeDefined();
  });

  test("getStopByKeyword(...) rejects error due to unresolvable keyword", () => {
    const mockRes = require("../../../__fixtures__/vvs/getStopByKeywordUnresolvableReject");
    axios.get.mockResolvedValue({ data: mockRes });

    const key = "xxx";
    return expect(vvs.getStopByKeyword(key)).rejects.toBeDefined();
  });

  test("getStopByKeyword(...) rejects error due to ambivalent keyword", () => {
    const mockRes = require("../../../__fixtures__/vvs/getStopByKeywordAmbivalentReject");
    axios.get.mockResolvedValue({ data: mockRes });

    const key = "Im Wiesengrund 40";
    expect(vvs.getStopByKeyword(key)).rejects.toBeDefined();
  });
});

describe("VVS Service: getStopByKeyword(...)", () => {
  let vvs;

  beforeEach(() => {
    vvs = require("./vvs")();
  });

  test("getTrip(...) resolves promise", () => {
    const mockRes = require("../../../__fixtures__/vvs/getTripResolve");
    axios.get.mockResolvedValue({ data: mockRes });

    const tripParams = {
      originId: 5000355,
      destinationId: 5006056,
    };
    return expect(vvs.getTrip(tripParams)).resolves.toBeDefined();
  });

  test("getTrip(...) returns object that contains certain properties", () => {
    const mockRes = require("../../../__fixtures__/vvs/getTripResolve");
    axios.get.mockResolvedValue({ data: mockRes });

    const tripParams = {
      originId: 5000355,
      destinationId: 5006056,
    };

    return vvs.getTrip(tripParams).then((res) => {
      expect(typeof res).toBe("object");
      expect(res).toHaveProperty("origin");
      expect(res).toHaveProperty("destination");
      expect(res).toHaveProperty("duration");
      expect(res).toHaveProperty("legs");
    });
  });

  test("getTrip(...) rejects error due to invalid query parameters", () => {
    const mockRes = require("../../../__fixtures__/vvs/getTripInvalidParametersReject");
    axios.get.mockResolvedValue({ data: mockRes });

    const tripParams = {
      originId: "foo",
      destinationId: "bar",
      // both IDs need to be valid numerical values for the API to resolve properly
    };
    return expect(vvs.getTrip(tripParams)).rejects.toBeDefined();
  });

  test("getTrip(...) sets date to current when no specific date is provided", () => {
    const mockRes = require("../../../__fixtures__/vvs/getTripResolve");
    axios.get.mockResolvedValue({ data: mockRes });

    const tripParams = {
      originId: 5000355,
      destinationId: 5006056,
      date: null,
    };

    return vvs.getTrip(tripParams).then(() => {
      expect(tripParams.date).toBeDefined();
    });
  });

  test("getTrip(...) sets date to specific date when provided", () => {
    const mockRes = require("../../../__fixtures__/vvs/getTripResolve");
    axios.get.mockResolvedValue({ data: mockRes });

    const tripParams = {
      originId: 5000355,
      destinationId: 5006056,
      date: new Date(),
    };

    return vvs.getTrip(tripParams).then(() => {
      expect(tripParams.date).toBeDefined();
    });
  });
});

describe("VVS Service: Errors", () => {
  let vvs;

  beforeEach(() => {
    vvs = require("./vvs")();
  });
  test("VvsUnresolvableKeywordError is thrown when query parameters yield no valid stop ID", () => {
    const mockRes = require("../../../__fixtures__/vvs/getStopByKeywordUnresolvableReject");
    axios.get.mockResolvedValue({ data: mockRes });

    const key = "xxx";
    return vvs.getStopByKeyword(key).catch((err) => {
      expect(err.message).toBe("[VVS Service Error] The query is not valid. " +
          "Please provide a valid query or try again.");
    });
  });

  test("VvsMultiplePointsError is thrown when query parameters yield more than one valid stop ID", () => {
    const mockRes = require("../../../__fixtures__/vvs/getStopByKeywordAmbivalentReject");
    axios.get.mockResolvedValue({ data: mockRes });

    const key = "Im Wiesengrund 40";
    return vvs.getStopByKeyword(key).catch((err) => {
      expect(err.message).toBe("[VVS Service Error] The query returns multiple addresses. " +
          "Please specify your city in your query.\n");
    });
  });
});
