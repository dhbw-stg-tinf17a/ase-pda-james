const axios = require("axios");
const htmlToText = require("html-to-text");
require("dotenv").config({path: __dirname + "./../../.env"});
const URL = require("url").URL;
const URLSearchParams = require("url").URLSearchParams;

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

  console.log("buildURL", url + params);
  return url + params;
};


/*
 * config: {
 *     origin,
 *     destination,
 *     travelMode: driving | walking | transit | bicycling
 *     arrivalTime: null | (integer) Specifies the desired time of arrival for transit directions,
 *                  in seconds since midnight, January 1, 1970 UTC
 *     }
 */
module.exports.getDirections = (config) => {
  return new Promise((resolve, reject) => {
    axios.get(buildURL(config))
        .then((response) => {
          // handle success
          const distance = response.data.routes[0].legs[0].distance.text;
          const duration = response.data.routes[0].legs[0].duration.text;

          // reformat direction steps to single string
          const steps = response.data.routes[0].legs[0].steps.map((step) => {
            // string comes as HTML => reformat to plain text string
            const htmlText = step.html_instructions;
            return htmlToText.fromString(htmlText);
          });

          resolve({distance: distance, duration: duration, steps: steps});
        })
        .catch(function(error) {
          // handle error
          console.error(error);
          reject(error);
        });
  });
};

module.exports.getGoogleMapsRedirectionURL = (destination) => {
  // build URL
  const url = new URL("https://www.google.com/maps/search/?");
  const params = new URLSearchParams({
    api: 1,
    query: destination,
  });

  console.log("buildURL", url + params);
  return url + params;
};
