const express = require('express');
const router = express.Router();

const controller = require('../controllers/market');

router.post('/create', controller.create);
router.get('/getByName/:name', controller.getByName);
router.get('/getAll', controller.getAll);

module.exports = router;