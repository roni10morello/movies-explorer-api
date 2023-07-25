const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const TOP_SECRET = require('../utils/config');
const MESSAGE_AUTH_ERROR = require('../utils/error');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : TOP_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(MESSAGE_AUTH_ERROR));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
