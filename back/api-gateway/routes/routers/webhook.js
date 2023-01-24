const express = require('express');
const router = express.Router();

const {
    signIn,
    signUp,
    signOut,
    signOAuth2
} = require('../controllers/sign');

router.get('/in', signIn);
router.get('/up', signUp);
router.get('/out', signOut);
router.get('/oauth2', signOAuth2);

module.exports = router;