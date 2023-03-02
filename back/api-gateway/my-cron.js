const cron = require("node-cron");
const {sendMail} = require('./routes/controllers/utils.js');

const actionMap = {
    'github': {
        'new_push': (user, param) => {
            console.log('github push');
            return true;
        },
        'new_pull_request': (user, param) => {
            console.log('github pull_request');
            return true;
        },
        'new_issue': (user, param) => {
            console.log('github issue');
            return true;
        }
    },
    'googleCalendar': {
        'new_event': (user, param) => {
            console.log('googleCalendar new_event');
            return true;
        },
        'delete_event': (user, param) => {
            console.log('googleCalendar delete_event');
            return true;
        }
    },
    'meteo': {
        'rain?': async (user, param) => {
            const loc = param.location;
            var apikeys = require('./routes/config/apikeys.json');
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `http://api.weatherapi.com/v1/current.json`,
                params: {key: apikeys.meteo, q: loc},
                headers: { }
            };
            await axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    if (response.data.current.precip_mm > 0)
                        return true;
                    else
                        return false;
                }
            );
            return false;
        },
        'sunny?': async (user, param) => {
            const loc = param.location;
            var apikeys = require('./routes/config/apikeys.json');
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `http://api.weatherapi.com/v1/current.json`,
                params: {key: apikeys.meteo, q: loc},
                headers: { }
            };
            await axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    if (response.data.current.condition.text == "Sunny")
                        return true;
                    else
                        return false;
                }
            );
            return false;
        },
        'snow?': async (user, param) => {
            const loc = param.location;
            var apikeys = require('./routes/config/apikeys.json');
            var axios = require('axios');
            var config = {
                method: 'get',
                url: `http://api.weatherapi.com/v1/current.json`,
                params: {key: apikeys.meteo, q: loc},
                headers: { }
            };
            await axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    if (response.data.current.condition.text == "Snow")
                        return true;
                    else
                        return false;
                }
            );
            return false;
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
    'slack': {
        'send': (user, param) => {
            console.log('slack send');
            return true;
        }
    },
    'google_calendar': {
        'create_event': (user, param) => {
            console.log('google_calendar create_event');
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
        "author": {
            "mail": "area.bot@outlook.com",
            "password": "Azerty123!"
        },
        "to": "zacharie2002@gmail.com",
        "subject": "test",
        "message": "test",
        "location": "Paris",
        "coin": "bitcoin"

    }
    const user = {
        "mail": "zacharie2002@gmail.com",
        "token": "123456789"
    }
    console.log('start reaction');
    if (actionMap["meteo"]["rain?"](user, param) == true) {
        param.subject = "rain";
        param.message = "it's raining";
        reactionMap["mail"]["send"](user, param);
    } else {
        param.subject = "no rain";
        param.message = "it's not raining";
        reactionMap["mail"]["send"](user, param);
    }
    //reactionMap["coinbase"]["get_price"](user, param);
    console.log('done');

});
