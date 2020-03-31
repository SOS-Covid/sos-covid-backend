const Campaign = require('../../models/campaign');

module.exports = (body) => {
  return new Campaign({
    campaign_name: body.campaign_name,
    reference_user: body.reference_user,
    description: body.description,
    assisted_entity: body.assisted_entity,
    type_donations: body.type_donations,
    state: body.state,
    city: body.city,
    served_region: body.served_region,
    initial_date: body.initial_date,
    final_date: body.final_date,
    donate_channels: body.donate_channels,
    status: body.status
  });
};