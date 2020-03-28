const { BadRequest } = require('../errors');

const schemaValidator = schema => async (req, res, next) => {
  try {
    await schema.validate(req.body, {
      abortEarly: true,
    });
    return next();
  } catch (error) {
    const err = new BadRequest(error);
    return next(err);
  }
};

module.exports = schemaValidator;