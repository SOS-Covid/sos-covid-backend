const joi = require('joi');

const createDonationSchema = joi.object({
  id_donor: joi.string().required(),
  id_receptor: joi.string().required(),
  items: joi.array(),
});

module.exports = {
  createDonationSchema,
};