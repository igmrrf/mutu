const responseHanldler = require('./responses/successResponse');
const CustomError = require('./responses/errorResponse');

const RootRoute = (req, res, next) => {
  try {
    return responseHanldler(
      res,
      200,
      "You'll recieve the response object as data"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = RootRoute;
