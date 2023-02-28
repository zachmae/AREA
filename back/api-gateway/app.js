/**
 * @file: app.js
 * @description: This file contains the main configuration of the API Gateway
 * @author: perry.chouteau@epitech.eu
 */

'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('chalk');
//const http = require('http');

const app = express();
//const server = http.createServer(app);
const IP = '0.0.0.0' //require('./utils/ip').getIp('config/ip.conf');
const PORT = 8080;

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
            const to = param.to;
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
cron.schedule('*/5 * * * *', () => {
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
        "coin": "bitcoin"

    }
    console.log('start reaction');
    reactionMap["coinbase"]["get_price"]("me", param);
    console.log('done');

});


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    const clientip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("clientip " + clientip);
    next();
});

//default
app.all('/', (req, res) => {
    res.status(200).send({message:`ok`});
});

const routerMain = express.Router();
const routerAbout  = require('./routes/routers/about.js');
const routerSign = require('./routes/routers/sign.js');
const routerGithub = require('./routes/routers/github.js');
const routerGoogle = require('./routes/routers/google.js');
const routerArea = require('./routes/routers/area.js');

app.use('/about.json', routerAbout);

routerMain.use('/sign', routerSign);
routerMain.use('/github', routerGithub);
routerMain.use('/google', routerGoogle);
routerMain.use('/area', routerArea)

app.use('/api/v1', routerMain);

//default
app.all('*', (req, res) => {
    res.status(500).send({status: false});
});

//server.listen(PORT, IP, () => console.log(`API Gateway listening on port ${colors.underline.red(`${IP}:${PORT}`)} !`));
app.listen( PORT, IP, () => console.log(`API Gateway listening on port ${colors.underline.red(`${IP}:${PORT}`)} !`));