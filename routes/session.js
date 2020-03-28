const express = require('express');

const schemaValidator = require('../middlewares/schema-validator');
const sessionValidator = require('../validators/session');
const controller = require('../controllers/session');

const router = express.Router();

router.post('/', schemaValidator(sessionValidator), controller.create);

module.exports = router;