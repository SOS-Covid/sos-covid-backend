const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const PasswordRecovery = new Schema({
  createdBy: {type: String, required: true},
  code: {type: String, required: true},
  expires: {type: String, required: true},
});

PasswordRecovery.pre('validate', function(done) {
  this.expires = moment().add('15', 'minutes').toISOString();
  this.code = Math.floor(Math.random() * 900000) + 100000;
  done();
});

module.exports = mongoose.model('PasswordRecovery', PasswordRecovery);