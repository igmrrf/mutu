const CustomErrorMessage = (err) => {
  console.log(err.message);
  const message = err.message.split(' ');
  console.log(message);
  console.log(message.includes('CORS'));
  if (message.includes('CORS'))
    return 'Reach out to https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS to learn about cors and possible solutions';

  return [];
};

const errorMiddleware = (err, req, res, next) => {
  if (err.statusCode)
    res.status(err.statusCode).json({
      responseCode: err.statusCode,
      error: err.message,
      status: 'error',
      data: err.data,
    });
  else if (err.status)
    res.status(err.status).json({
      responseCode: err.status,
      error: err.message,
      status: 'error',
      data: [],
    });
  else
    res.status(500).json({
      responseCode: 500,
      error: err.message,
      status: 'error',
      data: CustomErrorMessage(err),
    });
};

module.exports = errorMiddleware;
