const axios = require("axios");
const springer = require("./springer");
const searchResponse = require("../../__fixtures__/springerResponse");

jest.mock("axios");

test("fetches results from Springer API", () => {
  axios.get.mockResolvedValue(searchResponse);

  return springer.getByKeyword("user experience").then((data) => expect(data).toEqual(searchResponse));
});
