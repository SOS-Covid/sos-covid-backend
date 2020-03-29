const _ = require('lodash');

const Donation = require('../models/donation');

exports.create = async (req, res, next) => {
    try {
        const { body } = req;
        
        const newDonate = new Donation({
            id_donor: body.oid_donor,
            id_recptor: body.oid_recptor,
            items: _.get(body, 'items', undefined),
        });

        await newDonate.save();

        res.send(body);
    } catch (error) {
        next(error);
    }
};