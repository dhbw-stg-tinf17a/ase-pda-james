const axios = require("axios");
const moment = require("moment");
const gPlacesDetailEndpoint = "https://maps.googleapis.com/maps/api/place/details/json";
const gPlacesTextSearchEndpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json";
const gPlacesNearbySearchEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const e = require("./gplaces.error");


module.exports = function () {
  this.getPlaceById = (id) => {
    return new Promise((resolve, reject) => {
      axios.get(gPlacesDetailEndpoint, {
        params: {
          place_id: id,
          key: process.env.GOOGLE_API_KEY,
        },
      }).then((res) => {
        if (res.data.status === "OK") {
          resolve(res.data);
        } else if (res.data.status === "INVALID_REQUEST") {
          e.GPlacesInvalidParametersError.prototype = Object.create(Error.prototype);
          const err = new e.GPlacesInvalidParametersError("The entered parameter is invalid.", id);
          console.error(err);
          reject(err);
        } else {
          e.GPlacesApiError.prototype = Object.create(Error.prototype);
          const err = new e.GPlacesApiError("The API did not perform successfully.", res.status);
          console.error(err);
          reject(err);
        }
      })
          .catch((err) => {
            console.error(err);
            reject(new Error(`Axios Error${ err}`));
          });
    });
  };

  this.getPlaces = (params) => {
    return new Promise((resolve, reject) => {
      if ("location" in params && params.location) {
        this.getPlacesNearby(params)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
      } else {
        this.getPlacesByText(params)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
      }
    });
  };

  this.isPlaceOpen = (id, time) => {
    return new Promise((resolve, reject) => {
      this.getPlaceById(id)
          .then((res) => {
            this.minTimeDay = moment(time.minTime).isoWeekday();
            this.minTimeHour = moment(time.minTime).format("HHmm");
            this.minTimeHour = parseInt(this.minTimeHour, 10);
            this.maxTimeDay = moment(time.maxTime).isoWeekday();
            this.maxTimeHour = moment(time.maxTime).format("HHmm");
            this.maxTimeHour = parseInt(this.maxTimeHour, 10);
            res.result.opening_hours.periods.forEach((period) => {
              if (period.open.day === minTimeDay) {
                const minOpenHour = parseInt(period.open.time, 10);
                const maxOpenHour = parseInt(period.close.time, 10);
                if (minOpenHour <= minTimeHour && maxOpenHour >= maxTimeHour && period.close.day === maxTimeDay) {
                  resolve(true);
                } else {
                  reject(false);
                }
              }
            });
            reject(false);
          })
          .catch((err) => {
            reject(err);
          });
    });
  };
  this.getPlacesNearby = (params) => {
    return new Promise((resolve, reject) => {
      params.key = process.env.GOOGLE_API_KEY;
      if ("query" in params) {
        params.keyword = params.query;
        delete params.query;
      }
      axios.get(gPlacesNearbySearchEndpoint, { params }).then((res) => {
        if (res.data.status === "OK") {
          resolve(res.data);
        } else if (res.data.status === "INVALID_REQUEST") {
          e.GPlacesInvalidParametersError.prototype = Object.create(Error.prototype);
          const err = new e.GPlacesInvalidParametersError("The entered parameters are invalid.", params);
          console.error(err);
          reject(err);
        } else {
          e.GPlacesApiError.prototype = Object.create(Error.prototype);
          const err = new e.GPlacesApiError("The API did not perform successfully.", res.status);
          console.error(err);
          reject(err);
        }
      }).catch((err) => {
        console.error(`Axios Error${ err}`);
        reject(new Error(`Axios Error${ err}`));
      });
    });
  };

  this.getPlacesByText = (params) => {
    return new Promise((resolve, reject) => {
      params.key = process.env.GOOGLE_API_KEY;
      axios.get(gPlacesTextSearchEndpoint, { params })
          .then((res) => {
            if (res.data.status === "OK") {
              resolve(res.data);
            } else if (res.data.status === "INVALID_REQUEST") {
              e.GPlacesInvalidParametersError.prototype = Object.create(Error.prototype);
              const err = new e.GPlacesInvalidParametersError("The entered parameters are invalid.", params);
              console.error(err);
              reject(err);
            } else {
              e.GPlacesApiError.prototype = Object.create(Error.prototype);
              const err = new e.GPlacesApiError("The API did not perform successfully.", res.status);
              console.error(err);
              reject(err);
            }
          })
          .catch((err) => {
            console.error(`Axios Error${ err}`);
            reject(new Error(`Axios Error${ err}`));
          });
    });
  };
  return this;
};
