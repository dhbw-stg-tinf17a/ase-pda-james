const axios = require("axios");

const springerEndpoint = "http://api.springernature.com/metadata/json";

/**
 * retrieves a list of articles for a specific keyword from Springer
 * @param {string} title
 * @return {Promise<object>}
 */
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
