const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fa5ebcd76d232ed3e3df9aa3f42cd864&query=${latitude},${longitude}`;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback(`Unable to connect to the service.`, undefined);
        } else if(body['error']) {
            console.log(body);
            callback(`Invalid to find the location.`, undefined);
        } else {
            callback(undefined, body);
        }
    });
}

module.exports = forecast;