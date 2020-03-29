const HttpStatus = require('http-status-codes');
const moment = require('moment');
const aqp = require('api-query-params');

const User = require('../models/user');
const PasswordRecovery = require('../models/password-recovery');
const transform = require('./transforms/transform-request');
const config = require('../config');
const mailIntegration = require('../integrations/email');
const { NotFound, BadRequest, InternalServerError } = require('../errors');

const FILTER_ORGANIZATION = {'type': 'ORGANIZATION'};
const FILTER_MARKET = {'type': 'MARKET'};
const FILTER_CONTRIBUTOR = {'type': 'CONTRIBUTOR'};

exports.create = (req, res, next) => {
    const { body } = req;
    const newUser = transform(body);
    
    newUser.save((err) => {
        if (err) return next(err);
        body.password = undefined;
        res.send(body);
    });
};

exports.findOrganizations = async (req, res, next) => {
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

exports.findMarkets = async (req, res, next) => {
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


exports.findContributors = async (req, res, next) => {
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

exports.getById = async (req, res, next) => {
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

exports.getAll = async (req, res, next) => {
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

exports.recoveryPassword = async (req, res, next) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email });

        if (!user) return next(new NotFound('User not found'));

        await PasswordRecovery.deleteMany({ createdBy: email });
        const passRecovery = new PasswordRecovery({ createdBy: email });
        await passRecovery.save();

        const userName = `${user.first_name} ${user.last_name}`.trim();

        await mailIntegration.sendMail({
            to: `${userName} <${email}>`,
            subject: 'Recuperar senha',
            template: 'recovery',
            context: {
              name: userName,
              link: `${config.app.host}/user/valid-recovery/${passRecovery.code}`
            },
        });
    
        res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
};

exports.validRecovery = async (req, res, next) => {
    try {
        const { code } = req.params;

        const passRecovery = await PasswordRecovery.findOne({ code });
        const expiresIn = moment(passRecovery.expiresIn);
        const now = moment();

        if (expiresIn.isAfter(now)) {
            await PasswordRecovery.deleteMany({ createdBy: passRecovery.createdBy });
            return res.send('Invalid credentials');
        }

        const user = await User.findOne({ email: passRecovery.createdBy });

        const expiresInTemp = moment().add('15', 'minutes').valueOf();
        const tempJwt = user.generateJwt(expiresInTemp);

        const linkToRedirect = `${config.app.frontHostPasswordRecovery}/${tempJwt}`;

        res.status(HttpStatus.PERMANENT_REDIRECT).redirect(linkToRedirect);
    } catch (error) {
        next(error);
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { authMail } = req.context;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ email: authMail });

        const isMatch = user.comparePassword(oldPassword);

        if (!isMatch) return next(new BadRequest('Password\'s don\'t match'));

        await user.updateOne({ password: newPassword });

        res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
};