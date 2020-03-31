const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Campaign = new Schema({
    campaign_name:  {type: String, required: true},
    reference_user: {type: String, required: true},
    description: {type: String, required: true},
    assisted_entity: {type: String, required: true},
    type_donations: [],
    state: {type: String, required: true},
    city: {type: String, required: true},
    served_region: [],
    initial_date: {type: Date, required: true},
    final_date: {type: Date, required: true},
    donate_channels: [],
    status: {type: String, required: true}
});

module.exports = mongoose.model('Campaign', Campaign);