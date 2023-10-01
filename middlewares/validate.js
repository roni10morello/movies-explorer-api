const { celebrate, Joi } = require('celebrate');
const URL_PATTERN = require('../utils/constants');

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateChangeUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().min(2).max(300).required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().min(40).max(2000).required(),
    image: Joi.string().required().regex(URL_PATTERN),
    trailerLink: Joi.string().required().regex(URL_PATTERN),
    thumbnail: Joi.string().required().regex(URL_PATTERN),
    nameRU: Joi.string().min(1).max(200).required(),
    nameEN: Joi.string().min(1).max(200).required(),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validateSignIn,
  validateSignUp,
  validateChangeUser,
  validateDeleteMovie,
  validateCreateMovie,
};
