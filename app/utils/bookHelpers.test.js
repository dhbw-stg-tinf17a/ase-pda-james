describe("Event title helper", () => {
  let createEventTitle;

  beforeEach(() => createEventTitle = require("./bookHelpers").createEventTitle);

  test("Works if no keyword is provided", () => {
    const title = createEventTitle();

    expect(title).toEqual("Lernen");
  });

  test("Works if keyword is provided", () => {
    const title = createEventTitle("Unit Testing");

    expect(title).toEqual("Lernen: Unit Testing");
  });
});

describe("Free slot data helper", () => {
  let formatSlotButtonData;

  beforeEach(() => formatSlotButtonData = require("./bookHelpers").formatSlotButtonData);

  test("Works if no index is provided", () => {
    expect(() => formatSlotButtonData()).toThrow("No index provided");
  });

  test("Works if index 0 is provided", () => {
    const data = formatSlotButtonData(0);

    expect(data).toEqual("book_slot_0");
  });

  test("Works if index 2020 is provided", () => {
    const data = formatSlotButtonData(2020);

    expect(data).toEqual("book_slot_2020");
  });
});
