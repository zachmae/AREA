const express = require('express');
const router = express.Router();

const {
    servicesAbout,
} = require('../controllers/about.js');

router.get('/about.json', servicesAbout);
router.post('/about.json', servicesAbout);

module.exports = router;