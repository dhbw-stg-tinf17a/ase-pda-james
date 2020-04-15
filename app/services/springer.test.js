const axios = require("axios");
const searchResponse = require("../../__fixtures__/springerResponse");

jest.mock("axios");

describe("Springer service", () => {
  let springer;

  beforeEach(() => springer = require("./springer"));

  test("fetches results from Springer API", () => {
    axios.get.mockResolvedValue({data: searchResponse});

    return springer.getByKeyword("user experience").then((data) => {
      expect(data).toBeDefined();
      expect(data).toEqual(searchResponse);
    });
  });

  test("rejects if API error occurs", () => {
    axios.get.mockRejectedValue(new Error());

    return springer.getByKeyword("user experience").catch((error) => {
      expect(error).toBeDefined();
    });
  });
});
