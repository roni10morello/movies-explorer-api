require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');
const { MONGO_URL } = require('./utils/config');

const app = express();

const { PORT = 3000 } = process.env;

app.use(cors({
  origin: 'https://morello.nomoredomains.xyz/',
  credentials: true,
}));

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.log(`Connection is fail ${err}`);
  });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('{Хьюстон, у нас проблема!}');
  }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
