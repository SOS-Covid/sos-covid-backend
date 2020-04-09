const joi = require('joi');

const { userAccountType } = require('../enums/user');

const createUserSchema = joi.object({
  email: joi.string().email().required(),
  image: joi.string().optional(),
  password: joi.string().max(8).required(),
  cpf_cnpj: joi.string().max(16).required(),
  phone1: joi.string().max(20).required(),
  type: joi.string().required().valid(...Object.values(userAccountType)),
  name_organization: joi.string().max(50),
  social_reason: joi.string().max(100),
  site: joi.string().max(50),
  instagram: joi.string().max(50),
  facebook: joi.string().max(50),
  first_name: joi.string().max(100),
  last_name: joi.string().max(100),
  phone2: joi.string().max(20),
  cpf_responsible: joi.string().max(15),
  accepted_donate: joi.boolean().default(false),
  value: joi.number().default(0),
  delivery: joi.boolean().default(false),
  group_finality: joi.string().max(50),
  goal: joi.number().default(0),
  address: joi.array().items(joi.object()),
  payment_methods: joi.array().items(joi.object()),
  description: joi.string(),
  account_bank: joi.object({
    name_banking: joi.string().max(50),
    agency: joi.number(),
    account_number: joi.string().max(10),
    account_type: joi.string().max(15),
    name_favored: joi.string().max(50),
    cpf_cnpj: joi.string().max(16),
  }),
  help_types: joi.array().items(joi.string()),
  served_region: joi.array().items(joi.string()),
  assisted_entities: joi.array().items(joi.object()),
});

const updatePasswordSchema = joi.object({
  newPassword: joi.string().max(8).required(),
});

module.exports = {
  createUserSchema,
  updatePasswordSchema,
};