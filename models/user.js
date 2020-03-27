const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
});

module.exports = mongoose.model('User', User);