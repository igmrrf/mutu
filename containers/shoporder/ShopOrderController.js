const ShopOrder = require('./ShopOrderModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getShopOrders = async (req, res, next) => {
  try {
    const shopOrders = await ShopOrder.find().sort({ createdAt: -1 });
    const count = await ShopOrder.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no shopOrder(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} shopOrder(s)`,
      shopOrders
    );
  } catch (error) {
    next(error);
  }
};

const createShopOrder = async (req, res, next) => {
  try {
    const shopOrder = new ShopOrder({ ...req.body });
    await shopOrder.save();
    return responseHandler(res, 201, 'Account Successfully Created', shopOrder);
  } catch (error) {
    next(error);
  }
};

const updateShopOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shopOrder = await ShopOrder.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!shopOrder)
      return next(new CustomError(404, 'Invalid ID provided for shopOrder'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      shopOrder
    );
  } catch (error) {
    next(error);
  }
};

const getShopOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shopOrder = await ShopOrder.findById(id);
    if (!shopOrder)
      return next(
        new CustomError(404, "There's no shopOrder with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      shopOrder
    );
  } catch (error) {
    next(error);
  }
};

const deleteShopOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shopOrder = await ShopOrder.findByIdAndDelete(id);
    if (!shopOrder)
      return next(
        new CustomError(404, "There's no shopOrder with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer successfully deleted',
      shopOrder
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShopOrder,
  updateShopOrder,
  getShopOrders,
  getShopOrder,
  deleteShopOrder,
};
