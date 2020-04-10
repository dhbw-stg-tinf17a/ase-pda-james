describe("transformResearchResult", () => {
  const searchResult = require("../../__fixtures__/springerResponse");
  let transformResearchResult;

  beforeEach(() => transformResearchResult = require("./bookHelpers").transformResearchResult);

  test("works if records are provided", () => {
    const transformedResults = transformResearchResult(searchResult.records);

    expect(transformedResults).toHaveLength(10);
    expect(transformedResults[0]).toHaveProperty("title");
    expect(transformedResults[0]).toHaveProperty("url");
  });
});

describe("createResearchLinks", () => {
  let createResearchLinks;

  beforeEach(() => createResearchLinks = require("./bookHelpers").createResearchLinks);

  test("works if transformed records are provided", () => {
    const transformedResults = [{title: "Test", url: "test"}];

    expect(createResearchLinks(transformedResults)).toBe("<p><a href=\"test\">Test</a></p>");
  });
});

describe("createOpeningHoursLines", () => {
  let createOpeningHoursLines;

  beforeEach(() => createOpeningHoursLines = require("./bookHelpers").createOpeningHoursLines);

  test("works with no opening hours", () => {
    const text = createOpeningHoursLines([]);

    expect(text).toBe("<p>keine Angaben</p>");
  });

  test("works with opening hours", () => {
    const text = createOpeningHoursLines(["Monday: test", "Tuesday: test"]);

    expect(text).toBe("<p>Monday: test</p></br><p>Tuesday: test</p>");
  });
});
