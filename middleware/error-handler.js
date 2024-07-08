const { CaustomAPIError } = require("../errors/coustom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CaustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(500).json({ msg: "Somthing want wrong please try again " });
};

module.exports = errorHandlerMiddleware;
