const axios = require("axios");
const htmlToText = require("html-to-text");

const buildURL = (origin, destination, travelMode = "walking") => {
  // encode Strings for URL
  origin = encodeURIComponent(origin);
  destination = encodeURIComponent(destination);

  const url = new URL("https://maps.googleapis.com/maps/api/directions/json?");
  const params = new URLSearchParams({
    origin: origin,
    destination: destination,
    mode: travelMode,
    language: "de-DE",
    key: "AIzaSyBvztu8GeWZp8dop0iNmFTC7SMdwTvX_oM",
  });

  console.log("buildURL", url + params);
  return url + params;
};


module.exports.getDirections = (origin, destination) => {
  return new Promise((resolve, reject) => {
    axios.get(buildURL(origin, destination))
        .then((response) => {
          // handle success
          const distance = response.data.routes[0].legs[0].distance.text;
          const duration = response.data.routes[0].legs[0].duration.text;
          const steps = response.data.routes[0].legs[0].steps.map((step) => {
            const htmlText = step.html_instructions;
            return htmlToText.fromString(htmlText);
          });
          const string = distance + "\n" + duration + "\n" + steps.join("\n");
          resolve(string);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject(error);
        });
  });
};
