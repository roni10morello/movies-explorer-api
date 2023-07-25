const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const {
  OK,
  CREATED,
} = require('../utils/error');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
};

const deleteMovies = (req, res, next) => {
  const { filmId } = req.params;
  return Movie.findById(filmId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((data) => {
      if (data.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(filmId).then(() => res.status(OK).send(data));
      } else {
        next(new ForbiddenError('Нет прав доступа для удаления фильма'));
      }
    })
    .catch(next);
};

const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((data) => {
      res.status(CREATED).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};