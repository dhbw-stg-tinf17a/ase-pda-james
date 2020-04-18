/* eslint-disable */
module.exports = {
  origin: "Wallgraben",
  destination: "Rotebühlplatz",
  duration: 29,
  legs: [
    {
      start: {
        stopName: "Wallgraben",
        platform: "",
        date: "2020-04-18T14:05:00.000+02:00",
      },
      end: {
        stopName: "Vaihinger Straße",
        platform: "",
        date: "2020-04-18T14:08:00.000+02:00",
      },
      mode: {type: "Stadtbahn", code: "U3", destination: "Plieningen"},
    },
    {
      start: {
        stopName: "Vaihinger Straße",
        platform: "",
        date: "2020-04-18T14:10:00.000+02:00",
      },
      end: {
        stopName: "Charlottenplatz",
        platform: "Gleis 4",
        date: "2020-04-18T14:26:00.000+02:00",
      },
      mode: {type: "Stadtbahn", code: "U6", destination: "Gerlingen"},
    },
    {
      start: {
        stopName: "Charlottenplatz",
        platform: "Gleis 1",
        date: "2020-04-18T14:32:00.000+02:00",
      },
      end: {
        stopName: "Rotebühlplatz",
        platform: "",
        date: "2020-04-18T14:34:00.000+02:00",
      },
      mode: {
        type: "Stadtbahn",
        code: "U14",
        destination: "Hauptbf (A.-Klett-Pl.)",
      },
    },
  ],
};
