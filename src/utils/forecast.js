const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7116dea8d08c01c934ead7fd633c062c/' +  encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({
        url,
        json: true
    }, (error, response) => {
        const {error:responseError, daily, currently} = response.body;
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(responseError) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, daily.data[0].summary 
                + ' It is currently ' 
                + currently.temperature
                + ' degrees out. There is a '
                + currently.precipProbability + '%'
                + ' chance of rain.');
        }
    })
}

module.exports = forecast;