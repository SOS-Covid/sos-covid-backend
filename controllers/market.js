const Market = require('../models/market');
const Address = require('../models/market');

exports.create = (req, res) => {
    const { body } = req;
    const { address } = body;
    const { account_bank } = body;

    const market = new Market({
        name: body.name,
        cpfOrCnpj: body.cpfOrCnpj,
        email: body.email,
        phone1: body.phone1,
        phone2: body.phone2,
        delivery: body.delivery,
        delivery_value: body.delivery_value,
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
        account_bank: {
            name_banking: account_bank.name_banking,
            agency: account_bank.agency,
            account_number: account_bank.account_number,
            name_favored: account_bank.name_favored,
            cpf_cnpj: account_bank.cpf_cnpj
        }
    });

    market.save((err) => {
        if (err) return next(err);
        res.send(req.body);
    });
};

exports.getByName = async (req, res) => {
    try {
        const filter = {"name": req.params.name};
        const market = await  Market.findOne(filter);

        if(!market) return next(err);
        res.send(market);
    } catch (error) {
        next(error);
    }
};

exports.getAll = async (req, res) => {
    try {
        const market = await Market.find({});

        if(!market) return next(market);
        res.send(market);
    } catch (error) {
        next(error);
    }
};