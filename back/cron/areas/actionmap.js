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
        'cold?': async (user, param) => {
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
                    return response.data.current.temp_c < 0;
                }
            );
        },
        'warm?': async (user, param) => {
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
                    return response.data.current.temp_c > 30;
                }
            );
        },
        'night?': async (user, param) => {
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
                    return response.data.current.is_day == 0;
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
    },
    'coinflip': {
        'coinflip?': async (user, param) => {
            const isHeads = ["Tails","Heads"][param.isHeads];
            var axios = require('axios');
            const config = {
                method: 'GET',
                url: 'https://coin-flip1.p.rapidapi.com/headstails',
                headers: {
                    'X-RapidAPI-Key': apikeys['X-RapidAPI-Key'],
                    'X-RapidAPI-Host': apikeys['X-RapidAPI-Host']
                }
            };
            return axios(config)
                .then(function (response) {
                    return response.data.outcome == isHeads;
                }
            );
        }
    },
    'steam': {
        'isdiscounted?': async (user, param) => {
            const appid = param.appid;
            const discount = param.discount;
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `https://store.steampowered.com/api/appdetails?appids=${appid}`,
                headers: { }
            };
            return axios(config)
                .then(function (response) {
                    return response[appid].data.price_overview.discount_percent >= discount;
                }
            );
        },
        'isfree?': async (user, param) => {
            const appid = param.appid;
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `https://store.steampowered.com/api/appdetails?appids=${appid}`,
                headers: { }
            };
            return axios(config)
                .then(function (response) {
                    return response.data[appid].data.is_free;
                }
            );
        },
        'isout?': async (user, param) => {
            const appid = param.appid;
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `https://store.steampowered.com/api/appdetails?appids=${appid}`,
                headers: { }
            };
            return axios(config)
                .then(function (response) {
                    return !response.data[appid].data.release_date.coming_soon;
                }
            );
        }
    },
    'console' : {
        'true': async (user, param) => {
            return true;
        },
        'false': async (user, param) => {
            return false;
        }
    }
}

module.exports = {
    actionMap: actionMap
}