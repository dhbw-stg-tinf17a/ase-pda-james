module.exports = async function(db, origin, destination) {
  const prefs = require("./preferences")(db);

  const commutePref = await prefs.get("commute");
  const validCommutePrefs = ["driving", "walking", "bicycling", "vvs"];

  if (!validCommutePrefs.includes(commutePref)) {
    return new Error("Invalid preference.");
  }

  if (commutePref !== "vvs") {
    const gmaps = require("../services/gmaps");
    const directions = await gmaps.getDirections(origin, destination, commutePref);
    const gMapsUrl = gmaps.getGoogleMapsRedirectionURL(destination);

    return [directions, gMapsUrl];
  }

  const vvs = require("../services/vvs/vvs")();
  const transitStartAddress = origin;
  const transitStopAddress = destination;

  const transitStart = await vvs.getStopByKeyword(transitStartAddress);
  const transitStop = await vvs.getStopByKeyword(transitStopAddress);

  const transitStartId = transitStart.stopID;
  const transitStopId = transitStop.stopID;

  const trip = await vvs.getTrip({
    originId: transitStartId,
    destinationId: transitStopId,
  });

  return trip;
};
