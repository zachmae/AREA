const express = require('express');
const router = express.Router();

const {
    signIn,
    signUp,
    signUpVerif,
    signOut,
    signOAuth
} = require('../controllers/sign');

router.post('/in', signIn);
router.post('/up', signUp);
router.get('/upverif/:username/:code', signUpVerif);
router.post('/out', signOut);
router.post('/oauth', signOAuth);

module.exports = router;