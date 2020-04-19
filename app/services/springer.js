const axios = require("axios");

const springerEndpoint = "http://api.springernature.com/metadata/json";

const getByKeyword = (title) => {
  return new Promise((resolve, reject) => {
    axios.get(springerEndpoint, {
      params: {
        q: title,
        api_key: process.env.SPRINGER_TOKEN,
      },
    }).then((res) => {
      resolve(res.data);
    }, (err) => {
      reject(err);
    });
  });
};

module.exports = {getByKeyword};
