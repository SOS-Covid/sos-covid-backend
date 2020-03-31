const express = require('express');
const router = express.Router();

const schemaValidator = require('../middlewares/schema-validator');
const { createCampaignSchema } = require('../validators/campaign');
const { create, findAll, findPerPage, findByEmail } = require('../controllers/campaign');
const extractJwt = require('../middlewares/extract-jwt');

router.post('/create', schemaValidator(createCampaignSchema), create);
router.get('/find/all', findAll);
router.get('/find', findPerPage);
router.get('/find/:email', findByEmail);

module.exports = router;