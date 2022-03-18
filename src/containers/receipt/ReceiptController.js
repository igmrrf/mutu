const Receipt = require('./ReceiptModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getReceipts = async (req, res, next) => {
  try {
    const receipts = await Receipt.find().sort({ createdAt: -1 });
    const count = await Receipt.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no receipt(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} receipt(s)`, receipts);
  } catch (error) {
    next(error);
  }
};

const createReceipt = async (req, res, next) => {
  try {
    const receipt = new Receipt({ ...req.body });
    await receipt.save();
    return responseHandler(res, 201, 'Account Successfully Created', receipt);
  } catch (error) {
    next(error);
  }
};

const updateReceipt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const receipt = await Receipt.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!receipt)
      return next(new CustomError(404, 'Invalid ID provided for receipt'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      receipt
    );
  } catch (error) {
    next(error);
  }
};

const getReceipt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const receipt = await Receipt.findById(id);
    if (!receipt)
      return next(
        new CustomError(404, "There's no receipt with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      receipt
    );
  } catch (error) {
    next(error);
  }
};

const deleteReceipt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const receipt = await Receipt.findByIdAndDelete(id);
    if (!receipt)
      return next(
        new CustomError(404, "There's no receipt with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', receipt);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReceipt,
  updateReceipt,
  getReceipts,
  getReceipt,
  deleteReceipt,
};
