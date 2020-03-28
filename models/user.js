const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const config = require('../config');

const Schema = mongoose.Schema;

const User = new Schema({
    email: { type: String, 
             required: true, 
             max: 100, 
             index: { unique: true },
             match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill valid email address'],
            },
    password: {type: String, required: true},
    cpf_cnpj: {type: String, required: true, max: 16},
    phone1: {type: String, required: true},
    type:  {type: String, required: true},
    password: {type: String, required: true},
    name_organization: {type: String, required: false, max: 50},
    name_market: {type: String, required: false, max: 100},
    first_name: {type: String, required: false, max: 100},
    last_name: {type: String, required: false, max: 100},
    phone2: {type: String, required: false},
    address: {
        street: {type: String, required: false},
        number: {type: Number, required: false},
        complement: {type: String, required: false},
        district: {type: String, required: false},
        city: {type: String, required: false},
        state: {type: String, required: false},
        country: {type: String, required: false},
        postal_code: {type: String, required: false}
    },
    account_bank: {
        name_banking: {type: String, required: false},
        agency: {type: Number, required: false},
        account_number: {type: String, required: false},
        name_favored: {type: String, required: false},
        cpf_cnpj: {type: String, required: false}
    }
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

User.methods.generateJwt = function() {
    const expiresIn = moment().add('hours', 3).valueOf();
    return jwt.sign(
        {
            email: this.email,
        }, config.app.jwtSecret,
        {
            expiresIn,
        },
    );
};

module.exports = mongoose.model('User', User);