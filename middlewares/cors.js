const allowedCors = [
  'https://morello.nomoredomains.xyz/',
  'http://morello.nomoredomains.xyz/',
  'https://localhost:3001',
  'http://localhost:3001',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = cors;
