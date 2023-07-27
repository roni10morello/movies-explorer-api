const { INTERNAL_SERVER_ERROR, MESSAGE_SERVER_ERROR } = require('../utils/error');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message || MESSAGE_SERVER_ERROR });
  }
  next();
};

module.exports = errorHandler;
