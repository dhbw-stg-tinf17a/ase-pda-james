const axios = require("axios");
const gPlacesDetailEndpoint = "https://maps.googleapis.com/maps/api/place/details/json";
const gPlacesSearchEndpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json";

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
  this.getPlaceByText = (query, optionalParameters)=>{
    return new Promise((resolve, reject)=>{
      const requiredParameters= {
        query: query,
        key: process.env.GOOGLE_PLACES_KEY,
      };
      const params = Object.assign(requiredParameters, optionalParameters);

      axios.get(gPlacesSearchEndpoint, {params})
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
    });
  };
  return this;
};
