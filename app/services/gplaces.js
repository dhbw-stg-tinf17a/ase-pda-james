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
  this.getFormattedAddress = (query, optionalParameters)=>{
    return new Promise((resolve, reject)=>{
      const requiredParameters= {
        query: query,
        key: process.env.GOOGLE_PLACES_KEY,
      };
      const params = Object.assign(requiredParameters, optionalParameters);

      axios.get(gPlacesSearchEndpoint, {params})
          .then(function(response) {
            if (response.status == 200) {
              let postalCode;
              let street;
              let addressArray;
              const formatedAddress = [];
              response.data.results.forEach((result) => {
                postalCode = result.formatted_address.match(/\d{5}/);
                addressArray = result.formatted_address.split(",");
                if (addressArray.length === 3) {
                  street=addressArray[0];
                  city= addressArray[1];
                } else { // check for element with street name and house number
                  const streetRegEx= new RegExp(/\s*[A-Z][a-zßüäö]+\s?\d+/);
                  console.log(addressArray);
                  addressArray.forEach((element, index) =>{
                    console.log(streetRegEx.test(element));
                    console.log(element);
                    if (streetRegEx.test(element)) {
                      street = element.replace(/\s/, "");
                      city = addressArray[index+1];
                      console.log(street);
                    }
                  });
                }
                formatedAddress.push(
                    {
                      Straße: street,
                      Postleitzahl: postalCode[0],
                      Stadt: city.replace(/\s\d{5}\s/ig, ""),
                      Name: result.name,
                    },
                );
              });
              resolve(formatedAddress);
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
