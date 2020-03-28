const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');
const extractJwt = require('../middlewares/extract-jwt');

router.post('/register', controller.create);
// router.get('/getByName/:name', controller.getByName);
// router.get('/getAll', controller.getAll);
// router.get('/getById', controller.getById);
router.get(
  '/password-recovery/:email',
  controller.recoveryPassword,
);
router.get(
  '/valid-recovery/:code',
  controller.validRecovery,
);
router.patch(
  '/password',
  extractJwt,
  controller.updatePassword,
);

module.exports = router;