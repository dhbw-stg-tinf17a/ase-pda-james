const axios = require("axios");
const searchResponse = require("../../__fixtures__/gsearchResponse");
jest.mock("axios");
let gsearch;


describe("gsearch test cases", () => {
  beforeEach(() => {
    gsearch = require("./gsearch");
  });


  test("gmaps.getSearchResults returns something", () => {
    axios.get.mockResolvedValue({data: searchResponse});
    return gsearch.getSearchResults("Apotheke Stuttgart Stadtmitte").then((data) => {
      expect(data).toBeDefined();
    });
  });

  test("gmaps.getSearchResults has length", () => {
    axios.get.mockResolvedValue({data: searchResponse});
    return gsearch.getSearchResults("Apotheke Stuttgart Stadtmitte").then((data) => {
      expect(data.length).toBeGreaterThan(10);
    });
  });

  test("gmaps.getSearchResults returns error", () => {
    axios.get.mockResolvedValue(null);
    return expect(gsearch.getSearchResults("Apotheke Stuttgart Stadtmitte")).rejects.toBeDefined();
  });

  test("gmaps.getSearchResults returns error", () => {
    axios.get.mockResolvedValue({data: searchResponse});
    return expect(gsearch.getSearchResults("Apotheke Stuttgart Stadtmitte")).resolves.toBeDefined();
  });
});
