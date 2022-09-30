const Expense = require('./ExpenseModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    const count = await Expense.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no expense(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} expense(s)`, expenses);
  } catch (error) {
    next(error);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const expense = new Expense({ ...req.body });
    await expense.save();
    return responseHandler(res, 201, 'Account Successfully Created', expense);
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!expense)
      return next(new CustomError(404, 'Invalid ID provided for expense'));
    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      expense
    );
  } catch (error) {
    next(error);
  }
};

const getExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense)
      return next(
        new CustomError(404, "There's no expense with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      expense
    );
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense)
      return next(
        new CustomError(404, "There's no expense with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', expense);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  updateExpense,
  getExpenses,
  getExpense,
  deleteExpense,
};
