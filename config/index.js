const config = process.env.NODE_ENV === 'test'
  ? require('./test')
  : require('./default');

module.exports = config;
