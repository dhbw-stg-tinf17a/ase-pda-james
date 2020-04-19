const axios = require("axios");
const searchResponse = require("../../__fixtures__/gmapsResponse");
jest.mock("axios");

const { buildURL } = require("../utils/gmapsHelpers");


describe("gmaps test cases", () => {
  let gmaps;

  beforeEach(() => {
    gmaps = require("./gmaps");
  });


  test("resolves promise", () => {
    axios.get.mockResolvedValue({ data: searchResponse });
    const config = {
      origin: "Stuttgart Hauptbahnhof",
      destination: "Frankfurt",
    };
    return expect(gmaps.getDirections(config)).resolves.toBeDefined();
  });

  test("rejects error", () => {
    axios.get.mockResolvedValue(null);
    const config = {
      origin: "Stuttgart Hauptbahnhof",
      destination: "Frankfurt",
    };
    return expect(gmaps.getDirections(config)).rejects.toBeDefined();
  });

  test("fetches results from Google Maps API", () => {
    axios.get.mockResolvedValue({ data: searchResponse });

    return gmaps.getDirections("DHBW Stuttgart", "Frankfurt").then((data) => {
      expect(data).toBeDefined();
    });
  });


  test("gmaps.getDirections returns something", () => {
    axios.get.mockResolvedValue({ data: searchResponse });
    const config = {
      origin: "Stuttgart Hauptbahnhof",
      destination: "Frankfurt",
    };
    return gmaps.getDirections(config).then((data) => {
      expect(data).toBeDefined();
    });
  });

  test("gmaps.getDirections response has required properties", () => {
    axios.get.mockResolvedValue({ data: searchResponse });

    const config = {
      origin: "Stuttgart Hauptbahnhof",
      destination: "Frankfurt",
    };

    return gmaps.getDirections(config).then((data) => {
      expect(data).toHaveProperty("duration");
      expect(data).toHaveProperty("steps");
      expect(data).toHaveProperty("distance");
    });
  });

  test("gmaps.getDirections response has required properties", () => {
    axios.get.mockResolvedValue({ data: searchResponse });

    const config = {
      origin: "Stuttgart Hauptbahnhof",
      destination: "Frankfurt",
      arrival_time: 1999999999,
    };

    return gmaps.getDirections(config).then((data) => {
      expect(data).toHaveProperty("duration");
      expect(data).toHaveProperty("steps");
      expect(data).toHaveProperty("distance");
    });
  });

  test("gmaps.getGoogleMapsRedirectionURL has content", () => {
    const string = gmaps.getGoogleMapsRedirectionURL("Gerber Stuttgart");
    expect(string).toContain("Stuttgart");
  });
});

describe("gmaps helper functions", () => {
  let gmaps;

  beforeEach(() => {
    gmaps = require("./gmaps");
  });


  test("gmaps.getGoogleMapsRedirectionURL has content", () => {
    const config = {
      origin: "Stuttgart Hauptbahnhof",
      destination: "Frankfurt",
      arrival_time: 1999999999,
    };
    const string = buildURL(config);
    expect(string.length).toBeGreaterThan(10);
  });
});
