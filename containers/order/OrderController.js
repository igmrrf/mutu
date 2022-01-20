const Order = require('./OrderModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const count = await Order.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no order(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} order(s)`, orders);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const order = new Order({ ...req.body });
    await order.save();
    return responseHandler(res, 201, 'Account Successfully Created', order);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!order)
      return next(new CustomError(404, 'Invalid ID provided for order'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      order
    );
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order)
      return next(
        new CustomError(404, "There's no order with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      order
    );
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order)
      return next(
        new CustomError(404, "There's no order with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', order);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrders,
  getOrder,
  deleteOrder,
};
