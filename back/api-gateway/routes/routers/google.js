const express = require('express');
const router = express.Router();

const {
    googleRegisterToken
} = require('../controllers/google');

router.post('/registerToken', googleRegisterToken);

module.exports = router;