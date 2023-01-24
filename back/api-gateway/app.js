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
const {rfcNotFound} = require('./routes/rfc');

const app = express();

const IP = /*"localhost";*/ "10.68.246.139";

const PORT = 7000;


//middleware
app.use(bodyParser.json());
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
//const routerAccount = require('./routes/routers/account.js');
app.use('/api/v1/sign', routerSign);
//app.use('/api/v1/account', routerAccount);

//default
app.all('*', (req, res) => {
    res.status(500).send({status: False});
});

app.listen( PORT, IP, () => console.log(`API Gateway listening on port ${colors.underline.red(`${IP}:${PORT}`)} !`));