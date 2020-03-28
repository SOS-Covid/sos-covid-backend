const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  environment: process.env.NODE_ENV,
  app: {
    host: process.env.APP_HOST,
    port: process.env.HTTP_PORT || process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
  },
  db: {
    mongodb: {
      url: process.env.DB_MONGODB_URL,
      dbUser: process.env.DB_USER,
      dbPassword: process.env.DB_PASSWORD,
    },
  },
  api: {
    url: process.env.API_URL,
  },
};
