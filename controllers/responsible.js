const Responsible = require('../models/responsible');

exports.create = (req, res) => {
    const { body } = req;
    const { address } = body;

    const responsible = new Responsible({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone1: body.phone1,
        phone2: body.phone2,
        address: {
            street: address.street,
            number: address.number,
            complement: address.complement,
            district: address.district,
            city: address.city,
            state: address.state,
            country: address.country,
            postal_code: address.postal_code
        },
    });

    responsible.save((err) => {
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