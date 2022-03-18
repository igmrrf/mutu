const SubAccount = require('./SubAccountModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getSubAccounts = async (req, res, next) => {
  try {
    const subAccounts = await SubAccount.find().sort({ createdAt: -1 });
    const count = await SubAccount.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no subAccount(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} subAccount(s)`,
      subAccounts
    );
  } catch (error) {
    next(error);
  }
};

const createSubAccount = async (req, res, next) => {
  try {
    const subAccount = new SubAccount({ ...req.body });
    await subAccount.save();
    return responseHandler(
      res,
      201,
      'Account Successfully Created',
      subAccount
    );
  } catch (error) {
    next(error);
  }
};

const updateSubAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subAccount = await SubAccount.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!subAccount)
      return next(new CustomError(404, 'Invalid ID provided for subAccount'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      subAccount
    );
  } catch (error) {
    next(error);
  }
};

const getSubAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subAccount = await SubAccount.findById(id);
    if (!subAccount)
      return next(
        new CustomError(404, "There's no subAccount with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      subAccount
    );
  } catch (error) {
    next(error);
  }
};

const deleteSubAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subAccount = await SubAccount.findByIdAndDelete(id);
    if (!subAccount)
      return next(
        new CustomError(404, "There's no subAccount with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer successfully deleted',
      subAccount
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubAccount,
  updateSubAccount,
  getSubAccounts,
  getSubAccount,
  deleteSubAccount,
};
