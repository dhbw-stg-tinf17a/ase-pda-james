describe("transformResearchResult", () => {
  const searchResult = require("../../../test/__fixtures__/springerResponse");
  let transformResearchResult;

  beforeEach(() => transformResearchResult = require("./books.util").transformResearchResult);

  test("works if records are provided", () => {
    const transformedResults = transformResearchResult(searchResult.records);

    expect(transformedResults).toHaveLength(10);
    expect(transformedResults[0]).toHaveProperty("title");
    expect(transformedResults[0]).toHaveProperty("url");
  });
});

describe("createResearchLinks", () => {
  let createResearchLinks;

  beforeEach(() => createResearchLinks = require("./books.util").createResearchLinks);

  test("works if transformed records are provided", () => {
    const transformedResults = [{ title: "Test", url: "test" }];

    expect(createResearchLinks(transformedResults)).toBe("<p><a href=\"test\">Test</a></p>");
  });
});

describe("createOpeningHoursLines", () => {
  let createOpeningHoursLines;

  beforeEach(() => createOpeningHoursLines = require("./books.util").createOpeningHoursLines);

  test("works with no opening hours", () => {
    const text = createOpeningHoursLines([], "2020-04-07");

    expect(text).toBe("<p><b>07.04.2020: keine Angaben</b></p>");
  });

  test("works with opening hours", () => {
    const text = createOpeningHoursLines(["Monday: test", "Tuesday: test"], "2020-04-07");

    expect(text).toBe("<p>Monday: test</p></br><p><b>Tuesday: test</b></p>");
  });

  test("throws if no date is provided", () => {
    expect(() => createOpeningHoursLines([])).toThrowError("Parameter \"date\" fehlt");
  });
});
