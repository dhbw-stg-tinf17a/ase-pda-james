const axios = require("axios");
const conv = require("./vvsDateConverters");
const e = require("./vvsErrors");


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
          e.VvsApiError.prototype = Object.create(Error.prototype);
          const err = new e.VvsApiError("The API did not perform successfully.", res.status);

          reject(err);
        }

        // Query keyword not resolvable
        if (typeof pointRes === "undefined" || pointRes === null) {
          e.VvsUnresolvableKeywordError.prototype = Object.create(Error.prototype);
          const err = new e.VvsUnresolvableKeywordError("The query is not valid. " +
            "Please provide a valid query or try again.", key);

          reject(err);
        }

        // Query keyword ambiguous
        if (Array.isArray(pointRes)) {
          const points = [];
          pointRes.forEach((point) => {
            points.push(point.name);
          });

          e.VvsMultiplePointsError.prototype = Object.create(Error.prototype);
          const err = new e.VvsMultiplePointsError("The query returns multiple addresses. " +
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
          itdDate: conv.apiDateConverter(tripParams.date, "date"),
          itdTime: conv.apiDateConverter(tripParams.date, "time"),
          itdTripDateTimeDepArr: timeType,
        },
      };

      axios.get(apiUrl, apiParams).then((res) => {
        const tripsRes = res.data.trips;
        console.log(tripsRes);
        const trips = [];

        // --- ERROR HANDLING ------------------------------------------------------------------------------------------

        // API response error
        if (res.status != 200) {
          e.VvsApiError.prototype = Object.create(Error.prototype);
          const err = new e.VvsApiError("The API did not perform successfully.", res.status);

          reject(err);
        }

        // Parameter Error
        if (typeof tripsRes == "undefined") {
          e.VvsInvalidParametersError.prototype = Object.create(Error.prototype);
          const err = new e.VvsInvalidParametersError("The entered parameters are invalid.", apiParams);

          reject(err);
        }

        tripsRes.forEach((trip) => {
          const legs = [];
          trip.legs.forEach((leg) => {
            legs.push({
              start: {
                stopName: leg.points[0].name,
                platform: leg.points[0].platformName,
                date: conv.resDateConverter(leg.points[0].dateTime.date, leg.points[0].dateTime.time),
              },
              end: {
                stopName: leg.points[1].name,
                platform: leg.points[1].platformName,
                date: conv.resDateConverter(leg.points[1].dateTime.date, leg.points[1].dateTime.time),
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
              (legs[legs.length - 1].end.date - legs[0].start.date) / 1000 / 60
            ),
            legs: legs,
          });
        });
        console.log(trips);
        resolve(trips);
      });
    });
  };

  return this;
};
