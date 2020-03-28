const User = require('../models/user');
const { NotFound, Unauthorized } = require('../errors');

exports.create = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new NotFound('User not found'));

    const isMatch = user.comparePassword(password);
    if (!isMatch) return next(new Unauthorized('Invalid credentials'));

    res.send({
      first_name: user.first_name,
      last_name: user.last_name,
      token: user.generateJwt(),
    });
  } catch (error) {
    next(error);
  }
};