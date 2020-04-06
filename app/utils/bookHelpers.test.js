describe("createEventTitle", () => {
  let createEventTitle;

  beforeEach(() => createEventTitle = require("./bookHelpers").createEventTitle);

  test("works if no keyword is provided", () => {
    const title = createEventTitle();

    expect(title).toEqual("Lernen");
  });

  test("works if keyword is provided", () => {
    const title = createEventTitle("Unit Testing");

    expect(title).toEqual("Lernen: Unit Testing");
  });
});

describe("formatSlotButtonData", () => {
  let formatSlotButtonData;

  beforeEach(() => formatSlotButtonData = require("./bookHelpers").formatSlotButtonData);

  test("throws if no index is provided", () => {
    expect(() => formatSlotButtonData()).toThrow("No index provided");
  });

  test("works if index 0 is provided", () => {
    const data = formatSlotButtonData(0);

    expect(data).toEqual("book_slot_0");
  });

  test("works if index 2020 is provided", () => {
    const data = formatSlotButtonData(2020);

    expect(data).toEqual("book_slot_2020");
  });
});

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
    const transformedResults = [{title: "Test", url: "test.com"}];

    expect(createResearchLinks(transformedResults)).toBe("<p><a href=\"test.com\">Test</a></p>");
  });
});
