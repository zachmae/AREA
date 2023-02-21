const cron = require('node-cron');
const express = require('express');
const { fromValue } = require('long');
const router = express.Router();

// get bitcoin_value that is updated every 10 minutes

const getTimestamp = (async (req, res) => {
    cron.schedule('*/10 * * * * *', () => {
        console.log('running a task every 10 seconds');
        res.status(200).send({ timestamp: Date.now()});
    });
});

const bitcoinValueGetter = (async (req, res) => {
    var axios = require('axios');
    var config = {
        method: 'get',
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        headers: { }
    };
    await axios(config)
        .then(function (response) {
            bitcoin_value = response.data.bpi.USD.rate;
        }
    );
    res.status(200).send({ bitcoin_value: bitcoin_value});
});

router.get('/bitcoin_value', bitcoinValueGetter);
router.get('/timestamp', getTimestamp);

module.exports = router;