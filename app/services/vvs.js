const axios = require("axios");

module.exports = () => {
  this.getStopId = (input) => {
    return new Promise((resolve, reject) => {
      const validPoints = [];
      const apiUrl = "http://efastatic.vvs.de/vvs/XML_STOPFINDER_REQUEST?outputFormat=JSON&" +
      "locationServerActive=1&type_sf=any&name_sf=" + input;

      axios.get(apiUrl).then((res) => {
        if (res.status == 200) {
          console.log(JSON.stringify(res.data));
          res.data.stopFinder.points.forEach((point) => {
            validPoints.push({
              stopId: point.stateless,
              stopName: point.name,
            });
          });
          console.log(validPoints);
          resolve(validPoints);
        } else {
          reject(new Error("API error"));
        }
      });
    });
  };

  this.getTrips = (originId, destinationId, date, time, isDepTime) => {
    return new Promise((resolve, reject) => {
      const trips = [];

      let timeType = "dep";
      if (!isDepTime) timeType = "arr";

      const apiUrl = "http://efastatic.vvs.de/vvs/XML_TRIP_REQUEST2?outputFormat=JSON&itdTime=" +
        time + "&locationServerActive=1&name_origin=" +
        originId + "&type_origin=stopID&name_destination=" +
        destinationId + "&type_destination=stopID&itdDate=" +
        date + "&ptOptionsActive=1&itdTripDateTimeDepArr=" +
        timeType;

      axios.get(apiUrl).then((res) =>{
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
