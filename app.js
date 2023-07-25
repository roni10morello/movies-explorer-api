require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login, logOut } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateSignIn, validateSignUp } = require('./middlewares/validate');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 4000 } = process.env;

// app.use(cors({
//   origin: 'https://morello.nomoreparties.sbs',
//   credentials: true,
// }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.log(`Connection is fail ${err}`);
  });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('{Хьюстон, у нас проблема!}');
  }, 0);
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);
app.delete('/signout', logOut);
app.use('/', auth, routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
