const cron = require("node-cron");
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

const reactionMap = {
    'mail': {
        'send': (user, param) => {
            const author = param.author.mail;
            const password = param.author.password;
            const to = param.to;
            const subject = param.subject;
            const message = param.message;
            sendMail(author, password, to, subject, message);
            console.log('mail send');
            return true;
        }
    },
    'coinbase': {
        'get_price': async (user, param) => {
            console.log('coinbase get_price');
            const to = user.mail;
            var today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            var coin_value = 0;
            var axios = require('axios');
            var config = {
                method: 'get',
                url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
                headers: { }
            };
            await axios(config)
                .then(function (response) {
                    coin_value = response.data.bpi.USD.rate;
                    const message = `Le cours du ${param.coin} est de ${coin_value}$ le ${today}`;
                    sendMail(param.author.mail, param.author.password, to, `bitcoin value reminder`, message);
                }
            );
            return true;
        }
    },
    'console' : {
        'log': (user, param) => {
            console.log("[" + user.mail + "] logged: " + param.message);
            return true;
        }
    }
}

// every minute
cron.schedule('*/5 * * * * *', () => {
    console.log('running a task every 5 minute');
    // get db area list
    // for area in db list
    //     if area is active
    //         get user of the area
    //         if action(user, param) of the area is true:
    //             reaction(user, param)
    const param = {
        "message": "it return true",
        "timezone": "Europe/Paris",
        "day_of_week": 1,
        "hour": "08",
        "minute": "any"
    }
    const user = {
        "mail": "zacharie2002@gmail.com",
        "token": "123456789"
    }
    console.log('start reaction');
    actionMap["time"]["time?"](user, param).then((result) => {
        if (result == true)
            reactionMap["console"]["log"](user, param);
    });
    console.log('done');

});
