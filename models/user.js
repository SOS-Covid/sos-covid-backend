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
    name_organization: {type: String, required: false, max: 50},
    social_reason: {type: String, required: false, max: 100},
    site: {type: String, required: false},
    instagram: {type: String, required: false},
    facebook: {type: String, required: false},
    first_name: {type: String, required: false, max: 100},
    last_name: {type: String, required: false, max: 100},
    phone2: {type: String, required: false},
    cpf_responsible: {type: String, required: false},
    accepted_donate: {type: Boolean, required: false, default: false},
    value: {type: Number, required: false, default: 0},
    delivery: {type: Boolean, required: false},
    group_finality: {type: String, required: false},
    status: {type: Boolean, required: true, default: false},
    registred_at: {type: Date, default: Date.now},
    last_access: {type: Date, default: Date.now},
    goal: {type: Number, required: false},
    address: [],
    payment_methods: [],
    description: [String],
    account_bank: {
        name_banking: {type: String, required: false},
        agency: {type: Number, required: false},
        account_number: {type: String, required: false},
        account_type: {type: String, required: false},
        name_favored: {type: String, required: false},
        cpf_cnpj: {type: String, required: false}
    },
    help_types: [],
    served_region: [],
    assisted_entities: []
});

User.pre('updateOne', function(done) {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 10);
    done();
});

User.methods.comparePassword = function(candidatePassword) {
    try {
        return bcrypt.compareSync(candidatePassword, this.password);
    } catch (error) {
        return false;
    }
};

User.methods.generateJwt = function(expiresDate) {
    const expiresIn = expiresDate || moment().add('hours', 3).valueOf();
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