describe("Pairwise helper", () => {
  let pairwise;

  beforeEach(() => {
    pairwise = require("./calendarHelpers").pairwise;
  });

  test("Should work with empty array", () => {
    let counter = 0;
    pairwise([], () => counter++);

    expect(counter).toEqual(0);
  });

  test("Should work with array length 1", () => {
    let counter = 0;
    pairwise([1], () => counter++);

    expect(counter).toEqual(0);
  });

  test("Should work with array length 2", () => {
    let counter = 0;
    pairwise([1, 2], () => counter++);

    expect(counter).toEqual(1);
  });
});
