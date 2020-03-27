const User = require('../models/user');

exports.create = (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    user.save((err) => {
        if (err) {
            return next(err);
        }
        res.send(req.body);
    });
};

exports.getByName = async (req, res) => {
    try {
        const filter = {"name": req.params.name};
        const user = await  User.findOne(filter);

        if(!user){
            return next(err);
        }
        res.send(user);
    } catch (error) {
        next(err);
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