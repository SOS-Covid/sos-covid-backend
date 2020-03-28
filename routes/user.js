const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');

router.post('/register', controller.create);
router.get('/find/organization', controller.findOrganizations);
router.get('/find/market', controller.findMarkets);
router.get('/find/contributor', controller.findContributors);

module.exports = router;