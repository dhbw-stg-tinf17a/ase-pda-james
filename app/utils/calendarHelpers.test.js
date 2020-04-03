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

describe("busyToFree helper", () => {
  let busyToFree;

  beforeEach(() => {
    busyToFree = require("./calendarHelpers").busyToFree;
  });

  test("Should work with empty array", () => {
    const result = busyToFree([]);
    expect(result).toHaveLength(1);
  });

  // TODO: implement functionality and test
  // test("Should work with array length 1", () => {  });

  test("Should work with array length 2", () => {
    const result = busyToFree([{start: "A", end: "B"}, {start: "C", end: "D"}]);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("start");
    expect(result[0]).toHaveProperty("end");
  });
});
