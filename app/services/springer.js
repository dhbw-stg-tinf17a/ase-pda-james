const axios = require("axios");

const springerEndpoint = "http://api.springernature.com/metadata/json";

const getByKeyword = (title = "user experience") => {
  return new Promise((resolve, reject) => {
    // implement API calls
    axios.get(springerEndpoint, {
      params: {
        q: title,
        api_key: process.env.SPRINGER_TOKEN,
      },
    }).then((res) => {
      resolve(res.data);
    }, (err) => {
      reject(err);
    }).catch((err) => {
      console.error(err);
    });
  });
};

module.exports = { getByKeyword };
