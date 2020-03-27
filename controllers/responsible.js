const Responsible = require('../models/responsible');

exports.create = (req, res) => {
    const responsible = new Responsible({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement,
        district: req.body.district,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code
    });

    responsible.save((err) => {
        console.log(err);
        if (err) return next(err);
        res.send(req.body);
    });
};

exports.getByFirstName = async (req, res) => {
    try {
        const filter = {"first_name": req.params.first_name};
        const responsible = await  Responsible.findOne(filter);

        if(!responsible) return next(err);
        res.send(responsible);
    } catch (error) {
        next(error);
    }
};

exports.getAll = async (req, res) => {
    try {
        const responsible = await Responsible.find({});

        if(!responsible) return next(responsible);
        res.send(responsible);
    } catch (error) {
        next(error);
    }
};