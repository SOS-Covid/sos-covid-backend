const express = require('express');
const router = express.Router();

const extractJwt = require('../middlewares/extract-jwt');
const controller = require('../controllers/donation');

router.post('/create', extractJwt, controller.create);

module.exports = router;