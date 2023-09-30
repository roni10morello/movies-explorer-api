const router = require('express').Router();
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

const {
  validateDeleteMovie,
  validateCreateMovie,
} = require('../middlewares/validate');

router.get('/', getMovies);

router.delete('/:movieId', validateDeleteMovie, deleteMovies);

router.post('/', validateCreateMovie, createMovies);

module.exports = router;
