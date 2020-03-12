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

function apiDateConverter(date) {
  console.log("here");
  const apiYear = date.getFullYear();
  const apiMonth = () => {
    const monthAsString = (date.getMonth() + 1).toString();
    if (monthAsString.length == 1) {
      return `0${monthAsString}`;
    }
    return monthAsString;
  };
  const apiDay = () => {
    const dayAsString = date.getDate().toString();
    if (dayAsString.length == 1) {
      return `0${dayAsString}`;
    }
    return dayAsString;
  };
  return `${apiYear}${apiMonth()}${apiDay()}`;
}

function apiTimeConverter(date) {
  const apiHours = () => {
    console.log("here");
    const hourAsString = date.getHours().toString();
    if (hourAsString.length == 1) {
      return `0${hourAsString}`;
    }
    return hourAsString;
  };

  const apiMinutes = () => {
    console.log("here");
    const minutesAsString = date.getMinutes().toString();
    if (minutesAsString.length == 1) {
      return `0${minutesAsString}`;
    }
    return minutesAsString;
  };

  return `${apiHours()}${apiMinutes()}`;
}

function resDateConverter(date, time) {
  const dateComps = date.split(".");
  const timeComps = time.split(":");

  const year = dateComps[2];
  const month = dateComps[1];
  const day = dateComps[0];

  const hours = timeComps[0];
  const minutes = timeComps[1];

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
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
      const apiUrl = "http://efastatic.vvs.de/vvs/XML_TRIP_REQUEST2";

      if (typeof tripParams.date == "undefined") {
        tripParams.date = new Date();
      }

      let timeType = "dep";
      if (tripParams.isArrTime) timeType = "arr";

      const apiParams = {
        params: {
          outputFormat: "JSON",
          name_origin: tripParams.originId,
          type_origin: "stopID",
          name_destination: tripParams.destinationId,
          type_destination: "stopID",
          itdDate: apiDateConverter(tripParams.date),
          itdTime: apiTimeConverter(tripParams.date),
          itdTripDateTimeDepArr: timeType,
        },
      };

      axios.get(apiUrl, apiParams).then((res) => {
        const tripsRes = res.data.trips;
        const trips = [];

        tripsRes.forEach((trip) => {
          const legs = [];
          trip.legs.forEach((leg) => {
            legs.push({
              start: {
                stopName: leg.points[0].name,
                platform: leg.points[0].platformName,
                date: resDateConverter(leg.points[0].dateTime.date, leg.points[0].dateTime.time),
              },
              end: {
                stopName: leg.points[1].name,
                platform: leg.points[1].platformName,
                date: resDateConverter(leg.points[1].dateTime.date, leg.points[1].dateTime.time),
              },
              mode: {
                type: leg.mode.product,
                code: leg.mode.symbol,
                destination: leg.mode.destination,
              },
            });
          });
          trips.push({
            origin: legs[0].start.stopName,
            destination: legs[legs.length - 1].end.stopName,
            duration: (
              (legs[legs.length - 1].end.date - legs[0].start.date) / 1000 / 60 / 60
            ),
            legs: legs,
          });
        });
      });
    });
  };

  return this;
};
