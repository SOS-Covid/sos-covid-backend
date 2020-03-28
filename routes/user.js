const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');

router.post('/create', controller.create);
// router.get('/getByName/:name', controller.getByName);
// router.get('/getAll', controller.getAll);
// router.get('/getById', controller.getById);

module.exports = router;