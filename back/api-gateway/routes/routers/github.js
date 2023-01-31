const express = require('express');
const router = express.Router();

const {
    githubAuth,
    githubCode,
    githubAuth2,
    githubToken
} = require('../controllers/github');

router.get('/auth', githubAuth);
router.get('/code', githubCode);
router.get('/auth2', githubAuth2);
router.get('/token', githubToken);

module.exports = router;