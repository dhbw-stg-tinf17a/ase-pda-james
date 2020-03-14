const axios = require("axios");
const springer = require("./gmaps");
const searchResponse = require("../../__fixtures__/gplacesResponse");

jest.mock("axios");

let gplaces;

beforeEach(() => {
  gplaces = require("./gplaces");
});
describe("gplaces getPlaceByText", () => {
  test("if correct data gets fetched", () => {
    axios.get.mockResolvedValue({data: searchResponse});
    gplaces.getPlaceByText("DHBW Stuttgart").then((data) => {
      expect(data).toBeDefined();
    });
  });
});
