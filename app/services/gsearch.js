const axios = require("axios");
require("dotenv").config();

module.exports.getSearchResults = (query) => {
  return new Promise((resolve, reject) => {
    // build URL
    const url = new URL("https://www.googleapis.com/customsearch/v1?");
    const params = new URLSearchParams({
      key: process.env.GOOGLE_API_KEY,
      cx: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
      q: query,
      // prettyPrint: true
    });
    axios.get(url + params)
        .then((response) => {
          console.error(url + params);
          // handle success
          // return first 3 search results
          // TODO: adapt to future service structure - may return formatted HTML String or JSON
          resolve(response.data.items.slice(0, 3).map((item) => {
            return item.title + "\n" + item.link;
          }).join("\n\n"));
        })
        .catch(function(error) {
          // handle error
          console.error(error);
          reject(error);
        });
  });
};
