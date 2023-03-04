const {sendMail} = require('./utils.js');
var apikeys = require('./apikeys.json');

const reactionMap = {
    'mail': {
        'send': (user, param) => {
            const author = apikeys.mail;
            const password = apikeys.password;
            const to = param.to;
            const subject = param.subject;
            const message = param.message;
            sendMail(author, password, to, subject, message);
            console.log('mail send');
            return true;
        }
    },
    "telegraph": {
        "create_page": async (user, param) => {
            const author_name = param.author.name;
            const author_url = param.author.url;
            const content = param.content;
            const title = param.title;
            const access_token = apikeys.telegraph;
            const to = user.mail;
            const author_mail = apikeys.mail;
            const author_password = apikeys.password;
            var axios = require('axios');
            var config = {
                method: 'post',
                url: 'https://api.telegra.ph/createPage',
                headers: { },
                params: {
                    access_token: access_token,
                    author_name: author_name,
                    author_url: author_url,
                    content: content,
                    title: title
                }
            };
            await axios(config)
                .then(function (response) {
                    const message = `Page créée: ${response.data.result.url}`;
                    sendMail(author_mail, author_password, to, `telegraph page created: `+ title, message);
                    console.log("[" + user.mail + "] telegram page created: " + response.data.result.url);
                }
            );
        }
    },
    "aws": {
        "send_sns_sms": async (user, param) => {
            const to = param.phone_number;
            const message = param.message;
            const access_key = apikeys.aws.access_key;
            const secret_key = apikeys.aws.secret_key;
            const region = apikeys.aws.region;
            const phone_number = apikeys.aws.phone_number;
            const AWS = require('aws-sdk');
            AWS.config.update({
                accessKeyId: access_key,
                secretAccessKey: secret_key,
                region: region
            });
            const sns = new AWS.SNS();
            const params = {
                Message: message,
                PhoneNumber: to,
            };
            await sns.publish(params).promise()
                .then(function (data) {
                    console.log("[" + user.mail + "] sms sent to " + to);
                }
            );
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
                    sendMail(apikeys.mail, apikeys.password, to, `bitcoin value reminder`, message);
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
