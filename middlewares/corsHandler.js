const cors = require('cors');

const corsHandler = cors({
  origin: [
    'https://morello.nomoredomains.xyz/',
    'http://morello.nomoredomains.xyz/',
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-type'],
});

module.exports = corsHandler;
