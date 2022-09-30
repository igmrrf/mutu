const Payment = require('./PaymentModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    const count = await Payment.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no payment(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} payment(s)`, payments);
  } catch (error) {
    next(error);
  }
};

const createPayment = async (req, res, next) => {
  try {
    const payment = new Payment({ ...req.body });
    await payment.save();
    return responseHandler(res, 201, 'Account Successfully Created', payment);
  } catch (error) {
    next(error);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!payment)
      return next(new CustomError(404, 'Invalid ID provided for payment'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      payment
    );
  } catch (error) {
    next(error);
  }
};

const getPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    if (!payment)
      return next(
        new CustomError(404, "There's no payment with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      payment
    );
  } catch (error) {
    next(error);
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment)
      return next(
        new CustomError(404, "There's no payment with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', payment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPayment,
  updatePayment,
  getPayments,
  getPayment,
  deletePayment,
};
