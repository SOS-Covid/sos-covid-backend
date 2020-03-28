const User = require('../models/user');
const { NotFound, Unauthorized, InternalServerError } = require('../errors');

exports.create = (req, res, next) => {
  const { email, password } = req.body;

  User.where({ email }).findOne((err, user) => {
    if (err) return next(err);
    if (!user) return next(new NotFound('User not found'));

    user.comparePassword(password, (err, isMatch) => {
      if (err) return next(new InternalServerError('Unexpected error'));
      if (!isMatch) return next(new Unauthorized('Invalid credentials'));
      res.send({
        first_name: user.first_name,
        last_name: user.last_name,
        token: user.generateJwt(),
      });
    });
  });
};