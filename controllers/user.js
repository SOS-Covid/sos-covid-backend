const aqp = require('api-query-params');
const User = require('../models/user');
const transform = require('./transforms/transform-request');
const { InternalServerError } = require('../errors');

const FILTER_ORGANIZATION = {'type': 'ORGANIZATION'};
const FILTER_MARKET = {'type': 'MARKET'};
const FILTER_CONTRIBUTOR = {'type': 'CONTRIBUTOR'};

exports.create = (req, res) => {
    const { body } = req;
    const newUser = transform(body);
    
    newUser.save((err) => {
        if (err) return next(err);
        body.password = undefined;
        res.send(body);
    });
};

exports.findOrganizations = async (req, res) => {
    try {
        const { skip, limit } = aqp(req.query);
        
        User
          .find(FILTER_ORGANIZATION)
          .skip(skip)
          .limit(limit)
          .exec(async (err, result) => {
            if (err) {
               throw new InternalServerError('Unexpected error');
            }
            const count = await User.find(FILTER_ORGANIZATION).count();

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

exports.findMarkets = async (req, res) => {
    try {
        const { skip, limit } = aqp(req.query);
        
        User
          .find(FILTER_MARKET)
          .skip(skip)
          .limit(limit)
          .exec(async (err, result) => {
            if (err) {
               throw new InternalServerError('Unexpected error');
            }
            const count = await User.find(FILTER_MARKET).count();

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


exports.findContributors = async (req, res) => {
    try {
        const { skip, limit } = aqp(req.query);
        
        User
          .find(FILTER_CONTRIBUTOR)
          .skip(skip)
          .limit(limit)
          .exec(async (err, result) => {
            if (err) {
               throw new InternalServerError('Unexpected error');
            }
            const count = await User.find(FILTER_CONTRIBUTOR).count();

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

exports.getById = async (req, res) => {
    try {
        const filter = {"name": req.params.name};
        const user = await  User.findOne(filter);

        if(!user){
            return next(err);
        }
        res.send(user);
    } catch (error) {
        next(error);
    }
};

exports.getAll = async (req, res) => {
    try {
        const users = await User.find({});

        if(!users){
            return next(users);
        }
        res.send(users);
    } catch (error) {
        next(error);
    }
};