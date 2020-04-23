const buildURL = (config) => {
  // build URL
  const url = new URL("https://maps.googleapis.com/maps/api/directions/json?");

  let params = {
    origin: config.origin || "",
    destination: config.destination || "",
    mode: config.travelMode || "walking",
    language: "de-DE",
    key: process.env.GOOGLE_API_KEY,
  };

  if (config.arrivalTime) {
    params.arrival_time = config.arrivalTime;
  }

  params = new URLSearchParams(params);
  return url + params;
};
module.exports = { buildURL };
