const { stack } = require("../routes/userRoutes");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;

  //   console.log(statusCode);

  res.status(statusCode);

  //   console.log(res.status);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
