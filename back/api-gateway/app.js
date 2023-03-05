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
const routerArea = require('./routes/routers/area.js');
const routerSign = require('./routes/routers/sign.js');
const routerGithub = require('./routes/routers/github.js');
const routerGoogle = require('./routes/routers/google.js');

app.use(routerAbout);

routerMain.use('/sign', routerSign);
routerMain.use('/area', routerArea);
routerMain.use('/github', routerGithub);

app.use('/api/v1', routerMain);

//default
app.all('*', (req, res) => {
    res.status(500).send({status: false});
});

//server.listen(PORT, IP, () => console.log(`API Gateway listening on port ${colors.underline.red(`${IP}:${PORT}`)} !`));
app.listen( PORT, IP, () => console.log(`API Gateway listening on port ${colors.underline.red(`${IP}:${PORT}`)} !`));