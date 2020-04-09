const _ = require('lodash');
const Bcrypt = require("bcryptjs");
const User = require('../../models/user');

module.exports = (body) => {
  
  body.password = Bcrypt.hashSync(body.password, 10);

  return new User({
    email: body.email,
    image: body.image,
    password: body.password,
    cpf_cnpj: body.cpf_cnpj,
    phone1: body.phone1,
    type:  body.type,
    social_reason:  _.get(body, 'social_reason', undefined),
    site:  _.get(body, 'site', undefined),
    instagram:  _.get(body, 'instagram', undefined),
    value:  _.get(body, 'value', undefined),
    delivery:  _.get(body, 'delivery', undefined),
    facebook:  _.get(body, 'facebook', undefined),
    accepted_donate:  _.get(body, 'accepted_donate', undefined),
    name_organization: _.get(body, 'name_organization', undefined),
    name_market: _.get(body, 'name_market', undefined),
    first_name: _.get(body, 'first_name', undefined),
    last_name: _.get(body, 'last_name', undefined),
    phone2: _.get(body, 'phone2', undefined),
    status: _.get(body, 'status', undefined),
    registred_at: _.get(body, 'registred_at', undefined),
    last_access: _.get(body, 'last_access', undefined),
    group_finality: _.get(body, 'group_finality', undefined),
    goal: _.get(body, 'goal', undefined),
    address: _.get(body, 'address', undefined),
    description:_.get(body, 'description', undefined),
    payment_methods: _.get(body, 'payment_methods', undefined),
    account_bank: {
        name_banking: _.get(body, 'account_bank.name_banking', undefined),
        agency: _.get(body, 'account_bank.agency', undefined),
        account_number: _.get(body, 'account_bank.agency', undefined),
        name_favored: _.get(body, 'account_bank.name_favored', undefined),
        cpf_cnpj: _.get(body, 'account_bank.name_favored', undefined)
    },
    help_types: _.get(body, 'help_types', undefined),
    served_region: _.get(body, 'served_region', undefined),
    assisted_entities: _.get(body, 'assisted_entities', undefined)
  });
};