const axios = require("axios");
const gPlacesDetailEndpoint = "https://maps.googleapis.com/maps/api/place/details/json";
const gPlacesTextSearchEndpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json";
const gPlacesNearbySearchEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

module.exports = function() {
  this.getPlaceById = (id)=>{
    return new Promise((resolve, reject)=>{
      axios.get(gPlacesDetailEndpoint, {
        params: {
          place_id: id,
          key: process.env.GOOGLE_PLACES_KEY,
        },
      }).then(function(response) {
        if (response.status == 200) {
          resolve(response.data);
        } else {
          reject(new Error("API Error"));
        }
      }).catch(function(error) {
        reject(new Error("Axios Error"));
      });
    });
  };
  // with optionalParameters the search for places can be filtered e.g. only opened places.
  // All possible parameters can be found in the wiki
  this.getPlacesByText = (query, type, location, radius, optionalParameters)=>{
    return new Promise((resolve, reject)=>{
      if (location) {
        const requiredParameters= {
          location: location,
          radius: radius,
          rankby: "distance",
          keyword: query,
          type: type,
          key: process.env.GOOGLE_PLACES_KEY,
        };
        const params = Object.assign(requiredParameters, optionalParameters);

        axios.get(gPlacesNearbySearchEndpoint, {params})
            .then(function(response) {
              if (response.status == 200) {
                resolve(response.data);
              } else {
                console.log(response.data);
                reject(new Error("API Error"));
              }
            }).catch(function(error) {
              console.log(error);
              reject(new Error("Axios Error"));
            });
      } else {
        const requiredParameters= {
          query: query,
          key: process.env.GOOGLE_PLACES_KEY,
        };
        const params = Object.assign(requiredParameters, optionalParameters);

        axios.get(gPlacesTextSearchEndpoint, {params})
            .then(function(response) {
              if (response.status == 200) {
                resolve(response.data);
              } else {
                console.log(response.data);
                reject(new Error("API Error"));
              }
            }).catch(function(error) {
              console.log(error);
              reject(new Error("Axios Error"));
            });
      }
    });
  };
  return this;
};
