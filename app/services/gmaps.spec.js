let gmaps;

beforeEach(() => {
  gmaps = require("./gmaps");
});

test("gmaps.getDirections returns something", () => {
  gmaps.getDirections("DHBW Stuttgart", "Frankfurt").then((data) => {
    expect(data).toBeDefined();
  });
});

test("gmaps.getDirections has content", () => {
  gmaps.getDirections("DHBW Stuttgart", "Frankfurt").then((data) => {
    expect(data.length).toBeGreaterThan(10);
  });
});

test("gmaps.getGoogleMapsRedirectionURL has content", () => {
  const string = gmaps.getGoogleMapsRedirectionURL("Gerber Stuttgart");
  expect(string.length).toBeGreaterThan(10);
  console.log(string);
});
