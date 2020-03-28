const axios = require("axios");
const searchResponse = require("../../__fixtures__/gplacesResponse");

jest.mock("axios");

let gplaces;

beforeEach(() => {
  gplaces = require("./gplaces")();
});
describe("gplaces getPlaces", () => {
  test("if data gets fetched if only query specified", () => {
    axios.get.mockResolvedValue({data: searchResponse});
    return gplaces.getPlaces({query: "DHBW"}).then((data) => expect(data).toEqual(searchResponse));
  });
  test("if data gets fetched if only query specified", () => {
    axios.get.mockResolvedValue({data: searchResponse});
    return gplaces.getPlaces({location: "48.803790, 9.236430", radius: 200}).then((data) => expect(data).toEqual(searchResponse));
  });
  test("if data gets fetched if only query specified", () => {
    axios.get.mockResolvedValue({data: searchResponse});
    return gplaces.getPlaces().then((data) => expect(data).toEqual(searchResponse));
  });
});
