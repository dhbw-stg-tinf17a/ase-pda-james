let gmaps;

beforeEach(() => {
  gmaps = require("./gmaps");
});

test("gmaps.getDirections returns something", () => {
  gmaps.getDirections("Stuttgart", "Frankfurt").then((data) => {
    expect(data).toBeDefined();
  });
});

test("gmaps.getDirections has content", () => {
  gmaps.getDirections("Stuttgart", "Frankfurt").then((data) => {
    expect(data.length).toBeGreaterThan(10);
  });
});
