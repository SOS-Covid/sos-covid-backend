const joi = require('joi');

const { status } = require('../enums/status');

const createCampaignSchema = joi.object({
  campaign_name:  joi.string().required(),
  reference_user: joi.string().email().required(),
  description: joi.string().required(),
  assisted_entity: joi.string().required(),
  type_donations: joi.array(),
  state: joi.string().required(),
  city: joi.string().required(),
  served_region: joi.array(),
  initial_date: joi.date().required(),
  final_date: joi.date().required(),
  donate_channels: joi.array(),
  status: joi.string().required().valid(...Object.values(status)),
  collect: joi.boolean().optional(),
  collect_spot: joi.string().optional(),
});


module.exports = {
  createCampaignSchema,
};