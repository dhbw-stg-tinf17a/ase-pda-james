const axios = require("axios");
const searchResponse = require("../../__fixtures__/gplacesResponse");
const searchIdResponse = require("../../__fixtures__/gplacesIdResponse");
const failSearchResponse = require("../../__fixtures__/gplacesFailResponse");
const apiFailSearchResponse = require("../../__fixtures__/gplacesApiFailResponse");

jest.mock("axios");

let gplaces;


describe("gplaces getPlaces", () => {
  beforeEach(() => {
    gplaces = require("./gplaces")();
  });
  test("if data gets fetched if only query specified", () => {
    axios.get.mockResolvedValue({ data: searchResponse });
    return gplaces.getPlaces({ query: "DHBW" })
        .then((data) => expect(data).toEqual(searchResponse))
        .catch(() => fail());
  });
  test("if data gets fetched if only query specified", () => {
    axios.get.mockResolvedValue({ data: searchResponse });
    return gplaces.getPlaces({ location: "48.803790, 9.236430", radius: 200 })
        .then((data) => expect(data).toEqual(searchResponse))
        .catch(() => fail());
  });
  test("if data gets fetched if only query specified", () => {
    axios.get.mockResolvedValue({ data: searchResponse });
    return gplaces.getPlaces({ location: "48.803790, 9.236430" })
        .then((data) => expect(data).toEqual(searchResponse))
        .catch(() => fail());
  });
  test("if data gets fetched if only query specified", () => {
    axios.get.mockResolvedValue({ data: searchResponse });
    return gplaces.getPlaces({ query: "DHBW", location: "48.803790, 9.236430" })
        .then((data) => expect(data).toEqual(searchResponse))
        .catch(() => fail());
  });
});

describe("gplaces getFormattedAddress", () => {
  beforeEach(() => {
    gplaces = require("./gplaces")();
  });
  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: searchResponse });
    return gplaces.getFormattedAddress({ query: "DHBW" })
        .then((data) => expect(data).toEqual([
          {
            street: "Im Wiesengrund 40",
            postalCode: "70794",
            city: "Filderstadt",
            name: "Im Wiesengrund 40" },
          {
            street: "Im Wiesengrund 40",
            postalCode: "70806",
            city: "Kornwestheim",
            name: "Im Wiesengrund 40" },
        ]))
        .catch(() => {
          throw new Error("Fehlgeschlagen");
        });
  });
});

describe("gplaces getPlaceById", () => {
  beforeEach(() => {
    gplaces = require("./gplaces")();
  });
  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: failSearchResponse });
    return gplaces.getPlaceById("4f89212bf76dde31f092cfc14d7506555d85b5c7")
        .catch((err) => {
          expect(err.message).toBe("[GPlaces Service Error] The entered parameter is invalid.");
        });
  });
  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: apiFailSearchResponse });
    return gplaces.getPlaceById("4f89212bf76dde31f092cfc14d7506555d85b5c7")
        .catch((err) => {
          expect(err.message).toBe("[GPlaces Service Error] The API did not perform successfully.");
        });
  });
});

describe("gplaces getPlaceByText", () => {
  beforeEach(() => {
    gplaces = require("./gplaces")();
  });
  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: failSearchResponse });
    return gplaces.getPlacesByText({ query: "DHBW" })
        .catch((err) => {
          expect(err.message).toBe("[GPlaces Service Error] The entered parameters are invalid.");
        });
  });

  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: apiFailSearchResponse });
    return gplaces.getPlacesByText({ query: "DHBW" })
        .catch((err) => {
          expect(err.message).toBe("[GPlaces Service Error] The API did not perform successfully.");
        });
  });
});

describe("gplaces getPlacesNearby", () => {
  beforeEach(() => {
    gplaces = require("./gplaces")();
  });
  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: failSearchResponse });
    return gplaces.getPlacesNearby({ query: "DHBW", location: "48.803790, 9.236430" })
        .catch((err) => {
          expect(err.message).toBe("[GPlaces Service Error] The entered parameters are invalid.");
        });
  });
  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: apiFailSearchResponse });
    return gplaces.getPlacesNearby({ query: "DHBW", location: "48.803790, 9.236430" })
        .catch((err) => {
          expect(err.message).toBe("[GPlaces Service Error] The API did not perform successfully.");
        });
  });
});

describe("gplaces isPlaceOpen", () => {
  beforeEach(() => {
    gplaces = require("./gplaces")();
  });

  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: searchIdResponse });
    return gplaces.isPlaceOpen("4f89212bf76dde31f092cfc14d7506555d85b5c7", { maxTime: "2020-04-07T17:30:00+02:00", minTime: "2020-04-07T15:30:00+02:00" })
        .then((data) => {
          expect(gplaces.minTimeDay).toEqual(2);
          expect(gplaces.minTimeHour).toEqual(1530);
          expect(data).toBe(true);
        })
        .catch((err) => {
          throw new Error(err);
        });
  });

  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: searchIdResponse });
    return gplaces.isPlaceOpen("4f89212bf76dde31f092cfc14d7506555d85b5c7", { maxTime: "2020-04-07T17:35:00+02:00", minTime: "2020-04-07T15:30:00+02:00" })
        .then(() => {
          throw new Error("Should be closed");
        })
        .catch((err) => {
          expect(err).toBe(false);
        });
  });

  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: searchIdResponse });
    return gplaces.isPlaceOpen("4f89212bf76dde31f092cfc14d7506555d85b5c7", { maxTime: "2020-04-05T17:30:00+02:00", minTime: "2020-04-05T15:30:00+02:00" })
        .then(() => {
          throw new Error("Should be closed");
        })
        .catch((err) => {
          expect(err).toBe(false);
        });
  });

  test("if addresses get formatted", () => {
    axios.get.mockResolvedValue({ data: searchIdResponse });
    return gplaces.isPlaceOpen("4f89212bf76dde31f092cfc14d7506555d85b5c7", { maxTime: "2020-04-08T17:30:00+02:00", minTime: "2020-04-07T15:30:00+02:00" })
        .then(() => {
          throw new Error("Should be closed");
        })
        .catch((err) => {
          expect(err).toBe(false);
        });
  });
});
