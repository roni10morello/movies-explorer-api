const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { TOP_SECRET } = require('../utils/config');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-error');

const {
  OK,
  CREATED,
  MESSAGE_INCORRECT_DATA,
  MESSAGE_NOT_FOUND_USER,
  MESSAGE_CONFLICT_ERR,
} = require('../utils/error');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : TOP_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 36000000,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      res.send({ data: user });
    })
    .catch(next);
};

const logOut = (req, res) => {
  res.status(OK).clearCookie('jwt').send({ message: 'adios' });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(MESSAGE_NOT_FOUND_USER));
      }
      res.status(OK).send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE_INCORRECT_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGE_CONFLICT_ERR));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.status(OK).send({ data: user });
      } else {
        next(new NotFoundError(MESSAGE_NOT_FOUND_USER));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE_INCORRECT_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGE_CONFLICT_ERR));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  logOut,
  getUserInfo,
  createUser,
  updateUserInfo,
};
