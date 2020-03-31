const aqp = require('api-query-params');
const HttpStatus = require('http-status-codes');

const User = require('../models/user');
const Campaign = require('../models/campaign');
const transform = require('./transforms/transform-request-campaign');
const { NotFound } = require('../errors');

exports.create = async (req, res, next) => {
    try {
        const { body } = req;
        const filter = {"email": body.reference_user};
        const user = await  User.find(filter);
        
        if(user.length === 0) throw new NotFound('User not found');

        const newCampaign = transform(body);

        await newCampaign.save();

        res.send(body);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { email } = req.params;
        const filter = {"email": email};
        await  Campaign.findOneAndDelete(filter);
        
        res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        res.send(await Campaign.find({}));
    } catch (error) {
        next(error);
    }
};

exports.findByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const filter = { 'reference_user': email };
        const campaigns = await Campaign.find(filter);

        if(campaigns.length === 0) throw new NotFound('Campaigns not found');

        res.send(campaigns);
    } catch (error) {
        next(error);
    }
};

exports.findPerPage = async (req, res, next) => {
    try {
        const { skip, limit } = aqp(req.query);
        
        Campaign
          .find({})
          .skip(skip)
          .limit(limit)
          .exec(async (err, result) => {
            if (err) {
               throw new InternalServerError('Unexpected error');
            }
            const count = await Campaign.find({}).count();

            res.status(200).jsonp({
                limit: limit,
                skip: skip,
                total: count,
                data: result
            });
            });
    } catch (error) {
        next(error);
    }
};