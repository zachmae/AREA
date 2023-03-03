const {sendMail} = require('./utils.js');
var apikeys = require('./apikeys.json');

const actionMap = {
    'meteo': {
        'rain?': async (user, param) => {
            const loc = param.location;
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `http://api.weatherapi.com/v1/current.json`,
                params: {key: apikeys.meteo, q: loc},
                headers: { }
            };
            return axios(config)
                .then(function (response) {
                    return response.data.current.precip_mm > 0;
                }
            );
        },
        'sunny?': async (user, param) => {
            const loc = param.location;
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `http://api.weatherapi.com/v1/current.json`,
                params: {key: apikeys.meteo, q: loc},
                headers: { }
            };
            return axios(config)
                .then(function (response) {
                    return response.data.current.condition.text == "Sunny";
                }
            );
        },
        'snow?': async (user, param) => {
            const loc = param.location;
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `http://api.weatherapi.com/v1/current.json`,
                params: {key: apikeys.meteo, q: loc},
                headers: { }
            };
            return axios(config)
                .then(function (response) {
                    return response.data.current.condition.text == "Snow";
                }
            );
        }
    },
    'time': {
        'time?': async (user, param) => {
            const timezone = param.timezone;
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `http://worldtimeapi.org/api/timezone/${timezone}`,
                headers: { }
            };
            const day_of_week = param.day_of_week;
            const hour = param.hour;
            const minute = param.minute;
            return axios(config)
                .then(function (response) {
                    if (day_of_week == "any")
                        response.data.day_of_week = "any";
                    var apihour = response.data.datetime[11] + response.data.datetime[12];
                    if (hour == "any")
                        apihour = "any";
                    var apiminute = response.data.datetime[14] + response.data.datetime[15];
                    if (minute == "any")
                        apiminute = "any";
                    return apihour == hour && apiminute == minute && response.data.day_of_week == day_of_week;
                }
            );
        }
    }
}

module.exports = {
    actionMap: actionMap
}