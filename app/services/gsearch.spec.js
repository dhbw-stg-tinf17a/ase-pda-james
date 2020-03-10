let gsearch;

beforeEach(() => {
  gsearch = require("./gsearch");
});

test("gmaps.getSearchResults returns something", () => {
  gsearch.getSearchResults("Apotheke Stuttgart Stadtmitte").then((data) => {
    expect(data).toBeDefined();
  });
});
