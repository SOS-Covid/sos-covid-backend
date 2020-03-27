const express = require('express');
const router = express.Router();

const controller = require('../controllers/responsible');

router.post('/create', controller.create);
router.get('/getByFirstName/:first_name', controller.getByFirstName);
router.get('/getAll', controller.getAll);

module.exports = router;