module.exports = function(db, origin, destination) {
  const prefs = require("./preferences")(db);

  this.onUpdate((ctx) => {
    const commutePref = prefs.get("commute");

    if (typeof commutePref == "undefined") {
      // add dialogue to add commute preference
    }

    if (commutePref != "vvs" || commutePref != "gmaps") {
      return new Error(`Invalid commuting preference in Database ${db}`);
    }

    if (commutePref == "vvs") {
      const vvs = require("./vvs/vvs")();

      const start = vvs.getStopByKeyword(origin);
      const end = vvs.getStopByKeyword(destination);
    }

    if (commutePref == "gmaps") {
      const gmaps = require("./gmaps")();

      const url = new URL(gmaps.getGoogleMapsRedirectionLink(destination));
    }
  });
};
