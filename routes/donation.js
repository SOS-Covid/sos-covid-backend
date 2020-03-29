const express = require('express');
const router = express.Router();

const schemaValidator = require('../middlewares/schema-validator');
const { createDonationSchema } = require('../validators/donation');
const controller = require('../controllers/donation');
const extractJwt = require('../middlewares/extract-jwt');

router.post('/create', extractJwt, schemaValidator(createDonationSchema), controller.create);

module.exports = router;