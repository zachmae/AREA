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

const app = express();
const IP = '127.0.0.1' //require('./utils/ip').getIp('config/ip.conf');
const PORT = 8080;

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

const routerSign = require('./routes/routers/sign.js');
const routerAbout  = require('./routes/routers/about.js');
const routerGithub = require('./routes/routers/github.js');
const routerGoogle = require('./routes/routers/google.js');

app.use('/api/v1/sign', routerSign);
app.use('/about.json', routerAbout);
app.use('/api/v1/github', routerGithub);
app.use('/api/v1/google', routerGoogle);

//default
app.all('*', (req, res) => {
    res.status(500).send({status: false});
});

app.listen( PORT, IP, () => console.log(`API Gateway listening on port ${colors.underline.red(`${IP}:${PORT}`)} !`));