class CustomError extends Error {
  constructor(code, message, data = []) {
    super();
    this.statusCode = code;
    this.message = message;
    this.data = data;
  }
}

module.exports = CustomError;
