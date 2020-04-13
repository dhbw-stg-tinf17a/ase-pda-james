const axios = require("axios");
const moment = require("moment");

const util = require("./vvs.util");
const error = require("./vvs.error");


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

        // Query keyword not resolvable
        if (pointRes == null) {
          error.VvsUnresolvableKeywordError.prototype = Object.create(Error.prototype);
          const err = new error.VvsUnresolvableKeywordError("The query is not valid. " +
            "Please provide a valid query or try again.", key);

          reject(err);
        }

        // Query keyword ambiguous
        if (Array.isArray(pointRes)) {
          const points = [];
          pointRes.forEach((point) => {
            points.push(point.name);
          });

          error.VvsMultiplePointsError.prototype = Object.create(Error.prototype);
          const err = new error.VvsMultiplePointsError("The query returns multiple addresses. " +
            "Please specify your city in your query.\n", points);

          reject(err);
        }

        // -------------------------------------------------------------------------------------------------------------

        // Sort resulting stops array by distance (ascending)
        if (Array.isArray(stopRes)) {
          stopRes.sort((a, b) => {
            return a.distance - b.distance;
          });

          // resolve(stopRes[0]);
        }
        resolve(stopRes);
      });
    });
  };

  this.getTrip = (tripParams) => {
    return new Promise((resolve, reject) => {
      const apiUrl = "http://efastatic.vvs.de/vvs/XML_TRIP_REQUEST2";

      if (tripParams.date == null) {
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
          itdDate: moment(tripParams.date).format("YYYYMMDD"),
          itdTime: moment(tripParams.date).format("HHMM"),
          itdTripDateTimeDepArr: timeType,
        },
      };

      axios.get(apiUrl, apiParams).then((res) => {
        const tripsRes = res.data.trips;
        const trips = [];

        // --- ERROR HANDLING ------------------------------------------------------------------------------------------

        // Parameter Error
        if (tripsRes == null) {
          error.VvsInvalidParametersError.prototype = Object.create(Error.prototype);
          const err = new error.VvsInvalidParametersError("The entered parameters are invalid.", apiParams);

          reject(err);
        }

        tripsRes.forEach((trip) => {
          const legs = [];
          trip.legs.forEach((leg) => {
            legs.push({
              start: {
                stopName: leg.points[0].name,
                platform: leg.points[0].platformName,
                date: util.resDateConverter(leg.points[0].dateTime.date, leg.points[0].dateTime.time),
              },
              end: {
                stopName: leg.points[1].name,
                platform: leg.points[1].platformName,
                date: util.resDateConverter(leg.points[1].dateTime.date, leg.points[1].dateTime.time),
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
        resolve(trips);
      });
    });
  };

  return this;
};


