const Transaction = require('./TransactionModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    const count = await Transaction.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no transaction(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} transaction(s)`,
      transactions
    );
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    const transaction = new Transaction({ ...req.body });
    await transaction.save();
    return responseHandler(
      res,
      201,
      'Transaction Successfully Created',
      transaction
    );
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!transaction)
      return next(new CustomError(404, 'Invalid ID provided for transaction'));

    return responseHandler(
      res,
      200,
      'Transaction details successfully updated',
      transaction
    );
  } catch (error) {
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction)
      return next(
        new CustomError(404, "There's no transaction with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'Transaction Object containing details',
      transaction
    );
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction)
      return next(
        new CustomError(404, "There's no transaction with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'Transaction successfully deleted',
      transaction
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  updateTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction,
};
