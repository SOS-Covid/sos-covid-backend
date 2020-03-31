const express = require('express');
const router = express.Router();

const schemaValidator = require('../middlewares/schema-validator');
const { createUserSchema, updatePasswordSchema } = require('../validators/user');
const controller = require('../controllers/user');
const extractJwt = require('../middlewares/extract-jwt');

router.post('/register', schemaValidator(createUserSchema), controller.create);
router.delete('/remove/:email', controller.remove);
router.get('/find/organization', controller.findOrganizations);
router.get('/find/organization/all', controller.findAllOrganizations);
router.get('/find', controller.genericFind);
router.get('/find/market', controller.findMarkets);
router.get('/find/contributor', controller.findContributors);
router.get('/password-recovery/:email', controller.recoveryPassword);
router.get('/valid-recovery/:code', controller.validRecovery);
router.patch('/password', extractJwt, schemaValidator(updatePasswordSchema), controller.updatePassword);
router.get('/active/:email', controller.activate);

module.exports = router;