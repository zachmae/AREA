const express = require('express');
const router = express.Router();

const {
    signIn,
    signUp,
    signOut,
    signOAuth2
} = require('../controllers/sign');

router.post('/in', signIn);
router.post('/up', signUp);
router.post('/out', signOut);
router.post('/oauth2', signOAuth2);

module.exports = router;