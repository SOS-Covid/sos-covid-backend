const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');
const extractJwt = require('../middlewares/extract-jwt');

router.post('/register', controller.create);
router.get('/find/organization', extractJwt, controller.findOrganizations);
router.get('/find/market', extractJwt, controller.findMarkets);
router.get('/find/contributor', extractJwt, controller.findContributors);
router.get('/password-recovery/:email', controller.recoveryPassword);
router.get('/valid-recovery/:code', controller.validRecovery);
router.patch('/password', extractJwt, controller.updatePassword);
router.get('/active/:email', controller.activate);

module.exports = router;