const HttpStatus = require('http-status-codes');

class BadRequest extends Error {
  constructor(message) {
    super();
    this.status = HttpStatus.BAD_REQUEST;
    this.message = message;
  }
}

class NotFound extends Error {
  constructor(message) {
    super();
    this.status = HttpStatus.NOT_FOUND;
    this.message = message;
  }
}

class Forbidden extends Error {
  constructor(message) {
    super();
    this.status = HttpStatus.FORBIDDEN;
    this.message = message;
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super();
    this.status = HttpStatus.UNAUTHORIZED;
    this.message = message;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super();
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = message;
  }
}

module.exports = {
  BadRequest,
  NotFound,
  Forbidden,
  Unauthorized,
  InternalServerError,
};