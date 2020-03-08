const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmVueWFuODIxMSIsImEiOiJjazdna3h1NnEwMHFvM2Zxa2dwZWdjMmV1In0.-bt5zFt6_vlgzwM_2LqIGw&limit=1';
    request({
        url,
        json: true
    }, (error, response) => {
        const {features} = response.body;
        if(error) {
            callback('Unable to connect to geocoding service!', undefined);
        } else if(features.length === 0) {
            callback('Unable to find location! Try another search.', undefined);
        } else {
            const longitude = features[0].center[0];
            const latitude = features[0].center[1];
            callback(undefined, {
                latitude,
                longitude,
                location: features[0].place_name
            });
        }
    })
}

module.exports = geocode;

