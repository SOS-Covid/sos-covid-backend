const _ = require('lodash');
const Bcrypt = require("bcryptjs");
const User = require('../../models/user');

module.exports = (body) => {
  body.password = Bcrypt.hashSync(body.password, 10);

  return new User({
    email: body.email, 
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
    group_finality: _.get(body, 'group_finality', undefined),
    address: {
        street: _.get(body, 'address.street', undefined),
        number: _.get(body, 'address.number', undefined),
        complement: _.get(body, 'address.complement', undefined),
        district: _.get(body, 'address.district', undefined),
        city: _.get(body, 'address.city', undefined),
        state: _.get(body, 'address.state', undefined),
        country: _.get(body, 'address.country', undefined),
        postal_code: _.get(body, 'address.postal_code', undefined)
    },
    account_bank: {
        name_banking: _.get(body, 'account_bank.name_banking', undefined),
        agency: _.get(body, 'account_bank.agency', undefined),
        account_number: _.get(body, 'account_bank.agency', undefined),
        name_favored: _.get(body, 'account_bank.name_favored', undefined),
        cpf_cnpj: _.get(body, 'account_bank.name_favored', undefined)
    },
    help_types: _.get(body, 'help_types', undefined),
    served_region: _.get(body, 'served_region', undefined)
  });
};