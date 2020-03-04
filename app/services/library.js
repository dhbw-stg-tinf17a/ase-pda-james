const axios = require("axios").default;

const springerEndpoint = 'http://api.springernature.com/metadata/json';

module.exports = function() {
  this.getByTitle = (title) =>{
    return new Promise((resolve, reject)=>{
      // implement API calls
      axios.get(springerEndpoint, {
        params: {
          q: title,
          api_key: process.env.SPRINGER_TOKEN,
        }
      })
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  };
  return this;
};
