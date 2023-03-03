const {sendMail} = require('./utils.js');
var apikeys = require('./apikeys.json');

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

module.exports = {
    reactionMap: reactionMap
}
