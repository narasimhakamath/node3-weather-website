const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmFyYXNpbWhha2FtYXRoIiwiYSI6ImNrdm8zd3djYjF2dHUybnRrYWZ1aWdnODgifQ.PSL5DK8_jDpP3lbMOE_P-A`;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback(`Unable to connect to the location service.`, undefined);
        } else if(!body['features'].length) {
            callback(`Unable to find the location.`, undefined);
        } else {
            callback(undefined, {
                latitude: body['features'][0]['center'][1],
                longitude: body['features'][0]['center'][0],
                location: body['features'][0]['place_name'],
            });
        }
    });
}

module.exports = geocode;