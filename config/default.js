const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  environment: process.env.NODE_ENV,
  app: {
    host: process.env.APP_HOST,
    port: process.env.HTTP_PORT || process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    frontHost: process.env.FRONT_HOST,
  },
  db: {
    mongodb: {
      url: process.env.DB_MONGODB_URL,
      dbUser: process.env.DB_USER,
      dbPassword: process.env.DB_PASSWORD
    }
  },
  api: {
    url: process.env.API_URL
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    active: process.env.MAIL_ACTIVE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
    service: process.env.MAIL_SERVICE,
    default: {
      from: "Equipe Cooperação Solidária <coopsolidariacontato@gmail.com>"
    }
  },
  aws: {
    key: process.env.ACCESS_KEY_ID,
    secret: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket_name: process.env.S3_BUCKET
  },
  image: {
    default: process.env.DEFAULT_IMAGE,
  }
};
