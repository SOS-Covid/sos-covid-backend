const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/create', userController.create);
router.get('/getByName/:name', userController.getByName);
router.get('/getAll', userController.getAll);
router.get('/getById', userController.getById);

module.exports = router;