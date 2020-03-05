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

  return this;
};
