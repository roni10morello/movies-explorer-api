const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const NotFoundError = require('../errors/not-found-error');

router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
