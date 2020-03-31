const HttpStatus = require('http-status-codes');
const moment = require('moment');
const aqp = require('api-query-params');

const User = require('../models/user');
const PasswordRecovery = require('../models/password-recovery');
const transform = require('./transforms/transform-request-user');
const config = require('../config');
const mailIntegration = require('../integrations/email');

const { NotFound, InternalServerError } = require('../errors');
const { userAccountType } = require('../enums/user');
const FILTER_ORGANIZATION = {'type': userAccountType.ORGANIZATION };
const FILTER_MARKET = {'type': userAccountType.MARKET };
const FILTER_CONTRIBUTOR = {'type': userAccountType.CONTRIBUTOR };

exports.create = async (req, res, next) => {
    try {
        const { body } = req;
        const newUser = transform(body);

        const user = await newUser.save();
        const userName = `${user.first_name} ${user.last_name}`.trim();

        if (config.mail.active) {
            await mailIntegration.sendMail({
                to: `${userName} <${user.email}>`,
                subject: 'Confirmação de cadastro',
                template: 'confirm-member',
                context: {
                  name: userName,
                  link: `${config.app.host}/user/active/${user.email}`
                },
            });
        }

        delete body.password;

        res.send(body);
    } catch (error) {
        next(error);
    }
};

exports.genericFind = async (req, res, next) => {
    try {
        const { email, status, type } = req.query;
        const filter = {"email": email, 
                        "status": status,
                        "type": type
                       };
        const users = await  User.find(filter);

        if(users.length === 0) throw new NotFound('User not found');
        
        res.send(users);
    } catch (error) {
        next(error);
    }
};

exports.findAllOrganizations = async (req, res, next) => {
    try {

        const filter = {"type": userAccountType.ORGANIZATION};
        const users = await  User.find(filter);

        if(!users){
            return next(users);
        }
        res.send(users);
    } catch (error) {
        next(error);
    }
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

        const linkToRedirect = `${config.app.frontHost}/update-password/${tempJwt}`;

        res.status(HttpStatus.PERMANENT_REDIRECT).redirect(linkToRedirect);
    } catch (error) {
        next(error);
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { authMail } = req.context;
        const { newPassword } = req.body;

        const user = await User.findOne({ email: authMail });
        await user.updateOne({ password: newPassword });

        res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
};

exports.activate = async (req, res, next) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email, status: false });

        if (!user) return next(new NotFound('User not found'));

        await user.updateOne({ status: true });

        const linkToRedirect = `${config.app.frontHost}/user/activated`;
        
        res.status(HttpStatus.PERMANENT_REDIRECT).redirect(linkToRedirect);
    } catch (error) {
        next(error);
    }
};