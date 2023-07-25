const { MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { TOP_SECRET = 'this-is-the-way' } = process.env;

module.exports = { MONGO_URL, TOP_SECRET };
