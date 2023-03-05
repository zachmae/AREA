const express = require('express');
const router = express.Router();

const {
    setGithubToken,
    getGithubToken,
    listArea,
    getArea,
    createArea,
    deleteArea,
    activateArea,
    deactivateArea
} = require('../controllers/area.js');

router.post('/auth/github/set', setGithubToken);
router.post('/auth/github/get', getGithubToken);
router.get('/list', listArea);
router.post('/get', getArea);
router.post('/create', createArea);
router.post('/delete', deleteArea);
router.post('/list', listArea);
router.post('/activate', activateArea);
router.post('/deactivate', deactivateArea);

module.exports = router;
