const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Market = new Schema({
    name: {type: String, required: true, max: 50},
    cpfOrCnpj: {type: String, required: true, max: 16},
    email: {type: String, required: true, max: 100},
    phone1: {type: String, required: true},
    phone2: {type: String, required: false},
    delivery: {type: Boolean, required: true},
    delivery_value: {type: Number, required: false},
    address: {
        street: {type: String, required: true},
        number: {type: Number, required: true},
        complement: {type: String, required: true},
        district: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        postal_code: {type: String, required: true}
    },
    account_bank: {
        name_banking: {type: String, required: true},
        agency: {type: Number, required: true},
        account_number: {type: String, required: true},
        name_favored: {type: String, required: true},
        cpf_cnpj: {type: String, required: true}
    }
});

module.exports = mongoose.model('Market', Market);