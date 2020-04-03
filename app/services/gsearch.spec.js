const axios = require("axios");
const searchResponse = require("../../__fixtures__/gsearchResponse");
jest.mock("axios");
let gsearch;

beforeEach(() => {
  gsearch = require("./gsearch");
});

describe("gsearch test cases", () => {
  test("gmaps.getSearchResults returns something", () => {
    axios.get.mockResolvedValue({data: searchResponse});
    gsearch.getSearchResults("Apotheke Stuttgart Stadtmitte").then((data) => {
      expect(data).toBeDefined();
    });
  });
  test("gmaps.getSearchResults has lenght", () => {
    axios.get.mockResolvedValue({data: searchResponse});
    gsearch.getSearchResults("Apotheke Stuttgart Stadtmitte").then((data) => {
      expect(data.length).toBeGreaterThan(10);
    });
  });
});
