const CustomErrorMessage = (err) => {
  const message = err.message.split(" ");

  if (message.includes("CORS"))
    return "Reach out to https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS to learn about cors and possible solutions";

  return [];
};

class CustomError extends Error {
  constructor(statusCode, message, data = []) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

const errorMiddleware = (err, req, res, next) => {
  if (err.statusCode)
    res.status(err.statusCode).json({
      responseCode: err.statusCode,
      error: err.message,
      status: "error",
      data: err.data,
    });
  else if (err.status)
    res.status(err.status).json({
      responseCode: err.status,
      error: err.message,
      status: "error",
      data: [],
    });
  else
    res.status(500).json({
      responseCode: 500,
      error: err.message,
      status: "error",
      data: CustomErrorMessage(err),
    });
};

module.exports = { errorMiddleware, CustomError };
