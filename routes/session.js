const express = require('express');

const schemaValidator = require('../middlewares/schema-validator');
const { createSessionSchema } = require('../validators/session');
const controller = require('../controllers/session');

const router = express.Router();

router.post('/', schemaValidator(createSessionSchema), controller.create);

module.exports = router;