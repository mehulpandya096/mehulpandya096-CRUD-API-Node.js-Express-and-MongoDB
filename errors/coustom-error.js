class CaustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return CaustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CaustomAPIError };
