const Quote = require('./QuoteModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    const count = await Quote.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no quote(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} quote(s)`, quotes);
  } catch (error) {
    next(error);
  }
};

const createQuote = async (req, res, next) => {
  try {
    const quote = new Quote({ ...req.body });
    await quote.save();
    return responseHandler(res, 201, 'Account Successfully Created', quote);
  } catch (error) {
    next(error);
  }
};

const updateQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!quote)
      return next(new CustomError(404, 'Invalid ID provided for quote'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      quote
    );
  } catch (error) {
    next(error);
  }
};

const getQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);
    if (!quote)
      return next(
        new CustomError(404, "There's no quote with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      quote
    );
  } catch (error) {
    next(error);
  }
};

const deleteQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByIdAndDelete(id);
    if (!quote)
      return next(
        new CustomError(404, "There's no quote with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', quote);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuote,
  updateQuote,
  getQuotes,
  getQuote,
  deleteQuote,
};
