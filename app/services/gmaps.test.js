const axios = require("axios");
const searchResponse = require("../../__fixtures__/gmapsResponse");

jest.mock("axios");

let gmaps;

beforeEach(() => {
  gmaps = require("./gmaps");
});
describe("gmaps test cases", () => {
  test("fetches results from Google Maps API", () => {
    axios.get.mockResolvedValue({data: searchResponse});

    return gmaps.getDirections("DHBW Stuttgart", "Frankfurt").then((data) => {
      expect(data).toBeDefined();
    });
  });


  test("gmaps.getDirections returns something", () => {
    axios.get.mockResolvedValue({data: searchResponse});

    gmaps.getDirections("DHBW Stuttgart", "Frankfurt").then((data) => {
      expect(data).toBeDefined();
    });
  });

  test("gmaps.getDirections has content", () => {
    axios.get.mockResolvedValue({data: searchResponse});

    gmaps.getDirections("DHBW Stuttgart", "Frankfurt").then((data) => {
      expect(data.length).toBeGreaterThan(10);
    });
  });

  test("gmaps.getGoogleMapsRedirectionURL has content", () => {
    const string = gmaps.getGoogleMapsRedirectionURL("Gerber Stuttgart");
    expect(string.length).toBeGreaterThan(10);
    console.log(string);
  });
});
