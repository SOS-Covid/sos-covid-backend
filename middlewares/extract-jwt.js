const jwt = require('jsonwebtoken');

const config = require('../config');
const { Forbidden, Unauthorized } = require('../errors');


const extractJwt = (request, response, next) => {
  let authorization = request.get('authorization'); // Authorization Bearer xxxxxx
  let token = authorization ? authorization.split(' ')[1] : undefined;

  request['context'] = {};
  request['context']['authorization'] = authorization;

  if (!token) return next(new Forbidden('Required authentication'));

  jwt.verify(token, config.app.jwtSecret, (err, decoded) => {
    if (err) return next(new Unauthorized('Invalid credential'));
    request['context']['authMail'] = decoded.email;
    next();
  });
};

module.exports = extractJwt;