const mongoose = require('mongoose');
const CustomError = require('../utils/responses/errorResponse');

const isObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new CustomError(404, 'Invalid Id Provided'));
  }
  next();
};
module.exports = isObjectId;
