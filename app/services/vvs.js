const axios = require("axios");
const errorPrefix = "[VVS Service Error] ";

function VvsApiError(message, httpCode) {
  const error = new Error(errorPrefix + message);
  error.httpCode = httpCode;
  return error
}

function VvsMultiplePointsError(message, points) {
  const error = new Error(errorPrefix + message);
  error.points = points;
  return error;
}

function VvsUnresolvableKeywordError(message, keyword) {
  const error = new Error(errorPrefix + message);
  error.keyword = keyword;
  return error;
}

module.exports = () => {
  this.getStopByKeyword = (key) => {
    return new Promise((resolve, reject) => {
      const apiUrl = "http://efastatic.vvs.de/vvs/XML_STOPFINDER_REQUEST";
      const apiParams = {
        params: {
          outputFormat: "JSON",
          locationServerActive: "1",
          type_sf: "any",
          anyObjFilter_sf: "10",
          name_sf: key,
        },
      };

      axios.get(apiUrl, apiParams).then((res) => {
        const pointRes = res.data.stopFinder.points;
        const stopRes = res.data.stopFinder.itdOdvAssignedStops;

        // --- ERROR HANDLING ------------------------------------------------------------------------------------------

        // API response error
        if (res.status != 200) {
          VvsApiError.prototype = Object.create(Error.prototype);
          const err = new VvsApiError("The API did not perform successfully.", res.status);

          reject(err);
        }

        // Query keyword not resolvable
        if (typeof res === "undefined") {
          VvsUnresolvableKeywordError.prototype = Object.create(Error.prototype);
          const err = new VvsUnresolvableKeywordError("The query is not valid. " +
            "Please provide a valid query or try again.", key);

          reject(err);
        }

        // Query keyword ambiguous
        if (Array.isArray(pointRes)) {
          const points = [];
          pointRes.forEach((point) => {
            points.push(point.name);
          });

          VvsMultiplePointsError.prototype = Object.create(Error.prototype);
          const err = new VvsMultiplePointsError("The query returns multiple addresses. " +
            "Please specify your city in your query.\n", points);

          reject(err);
        }

        // -------------------------------------------------------------------------------------------------------------

        // Sort resulting stops array by distance (ascending)
        if (Array.isArray(stopRes)) {
          stopRes.sort((a, b) => {
            return a.distance - b.distance;
          });

          resolve(stopRes[0]);
        }
        resolve(stopRes);
      });
    });
  };

  this.getTrip = (tripParams) => {
    return new Promise((resolve, reject) => {
      const trips = [];

      let timeType = "dep";
      if (!tripParams.isDepTime) timeType = "arr";

      const apiUrl = "http://efastatic.vvs.de/vvs/XML_TRIP_REQUEST2";

      const apiParams = {
        outputFormat: "JSON",
        name_origin: tripParams.originId,
        name_destination: tripParams.destinationId,
        itdTime: tripParams.time,
        itdDate: tripParams.date,
        itdTripDateTimeDepArr: timeType,
      };

      axios.get(apiUrl, apiParams).then((res) =>{
        if (res.status == 200) {
          console.log(JSON.stringify(res.data));
          res.data.trips.forEach((trip) => {
            trips.push(trip);
          });
          console.log("Number of trips found: " + trips.length);
          resolve(trips);
        } else {
          reject(new Error("API Error"));
        }
      });
    });
  };

  return this;
};
