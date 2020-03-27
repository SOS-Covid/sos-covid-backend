const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Responsible = new Schema({
    first_name: {type: String, required: true, max: 50},
    last_name: {type: String, required: false, max: 50},
    email: {type: String, required: true, max: 100},
    phone1: {type: String, required: true},
    phone2: {type: String, required: true},
    street: {type: String, required: true},
    number: {type: Number, required: true},
    complement: {type: String, required: false},
    district: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    postal_code: {type: String, required: true}
});

module.exports = mongoose.model('Responsible', Responsible);