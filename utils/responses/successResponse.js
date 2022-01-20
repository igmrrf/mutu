module.exports = (res, code, message, data = {}) => {
  res.status(code).json({
    success: true,
    responseCode: code,
    message: message,
    data,
  });
};
