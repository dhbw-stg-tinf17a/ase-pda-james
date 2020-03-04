const axios = require('axios');
const htmlToText = require('html-to-text');
const googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyBvztu8GeWZp8dop0iNmFTC7SMdwTvX_oM"//process.env.GOOGLE_API_KEY
});

const buildURL = (origin, destination, travelMode = "walking") => {
    // encode Strings for URL
    origin = encodeURIComponent(origin);
    destination = encodeURIComponent(destination);
    const url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&language=de-DE&key=" + "AIzaSyBvztu8GeWZp8dop0iNmFTC7SMdwTvX_oM";
    console.log("buildURL", url);
    return url;
};


module.exports.getDirections = (origin, destination) => {

    return new Promise((resolve, reject) => {

        /*    googleMapsClient.directions({
                origin: "Stuttgart",
                destination: "Frankfurt"
            },data=>resolve(data))/*.then(r => {
                resolve(r)
            })
                .catch(e => {
                    reject(e)
                });*/


        // implement API calls
        axios.get(buildURL(origin, destination))
            .then((response) => {
                // handle success
                // console.log("handle success", response.data);

                //  console.log(response.data.routes[0].legs[0])
                const distance = response.data.routes[0].legs[0].distance.text
                const duration = response.data.routes[0].legs[0].duration.text
                const steps = response.data.routes[0].legs[0].steps.map(step => {
                    const htmlText = step.html_instructions
                    // console.log(htmlText)
                    return htmlToText.fromString(htmlText)
                })
                //  console.log(steps)
                const string = distance + "\n" + duration + "\n" + steps.join("\n");
                resolve(string);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                reject(error)
            })
    })
}