const express = require('express');
const router = express.Router();

const {
    servicesAbout,
} = require('../controllers/about.js');

router.get('/', servicesAbout);

module.exports = router;