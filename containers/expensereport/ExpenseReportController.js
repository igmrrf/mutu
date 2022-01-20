const ExpenseReport = require('./ExpenseReportModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getExpenses = async (req, res, next) => {
  try {
    const expensereports = await Expense.find().sort({ createdAt: -1 });
    const count = await ExpenseReport.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no expense(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} expense(s)`,
      expensereports
    );
  } catch (error) {
    next(error);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const expenseReport = new ExpenseReport({ ...req.body });
    await expenseReport.save();
    return responseHandler(
      res,
      201,
      'Account Successfully Created',
      expenseReport
    );
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expenseReport = await ExpenseReport.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!expenseReport)
      return next(new CustomError(404, 'Invalid ID provided for expense'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      expenseReport
    );
  } catch (error) {
    next(error);
  }
};

const getExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expenseReport = await ExpenseReport.findById(id);
    if (!expenseReport)
      return next(
        new CustomError(404, "There's no expense with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      expenseReport
    );
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expenseReport = await ExpenseReport.findByIdAndDelete(id);
    if (!expenseReport)
      return next(
        new CustomError(404, "There's no expense with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer successfully deleted',
      expenseReport
    );
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
