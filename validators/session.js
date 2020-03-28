const joi = require('joi');

const createSessionSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = {
  createSessionSchema,
};