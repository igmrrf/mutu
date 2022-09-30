const PaymentMethod = require('./PaymentMethodModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethod.find().sort({ createdAt: -1 });
    const count = await PaymentMethod.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no PaymentMethod(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} PaymentMethod(s)`,
      PaymentMethods
    );
  } catch (error) {
    next(error);
  }
};

const createPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = new PaymentMethod({ ...req.body });
    await paymentMethod.save();
    return responseHandler(
      res,
      201,
      'Account Successfully Created',
      paymentMethod
    );
  } catch (error) {
    next(error);
  }
};

const updatePaymentMethod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paymentMethod = await PaymentMethod.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!paymentMethod)
      return next(
        new CustomError(404, 'Invalid ID provided for PaymentMethod')
      );

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      paymentMethod
    );
  } catch (error) {
    next(error);
  }
};

const getPaymentMethod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paymentMethod = await PaymentMethod.findById(id);
    if (!paymentMethod)
      return next(
        new CustomError(404, "There's no PaymentMethod with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      paymentMethod
    );
  } catch (error) {
    next(error);
  }
};

const deletePaymentMethod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paymentMethod = await PaymentMethod.findByIdAndDelete(id);
    if (!paymentMethod)
      return next(
        new CustomError(404, "There's no PaymentMethod with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer successfully deleted',
      paymentMethod
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPaymentMethod,
  updatePaymentMethod,
  getPaymentMethods,
  getPaymentMethod,
  deletePaymentMethod,
};
