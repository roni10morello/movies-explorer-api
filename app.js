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
const { MESSAGE_CRASH_TEST } = require('./utils/error');

const app = express();

const { PORT = 3001 } = process.env;
app.use(cors({
  origin: ['https://morello.nomoredomains.xyz/', 'http://localhost:3001/'],
  credentials: true,
  // sameSite: 'none',
  // secure: true,
}));

// app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000/',
//   credentials: true,
//   sameSite: 'None',
//   secure: true,
// }));

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
    throw new Error(MESSAGE_CRASH_TEST);
  }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
