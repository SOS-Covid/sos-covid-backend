const express = require('express');
const router = express.Router();

const responsibleController = require('../controllers/responsible');

router.post('/create', responsibleController.create);
router.get('/getByFirstName/:first_name', responsibleController.getByFirstName);
router.get('/getAll', responsibleController.getAll);

module.exports = router;