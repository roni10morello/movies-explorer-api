const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const { validateSignIn, validateSignUp } = require('../middlewares/validate');
const { createUser, login, logOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { MESSAGE_PAGE_NOT_FOUND } = require('../utils/error');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.delete('/signout', logOut);
router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError(MESSAGE_PAGE_NOT_FOUND));
});

module.exports = router;
