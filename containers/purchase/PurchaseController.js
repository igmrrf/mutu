const Purchase = require('./PurchaseModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 });
    const count = await Purchase.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no purchase(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} purchase(s)`,
      purchases
    );
  } catch (error) {
    next(error);
  }
};

const createPurchase = async (req, res, next) => {
  try {
    const purchase = new Purchase({ ...req.body });
    await purchase.save();
    return responseHandler(res, 201, 'Account Successfully Created', purchase);
  } catch (error) {
    next(error);
  }
};

const updatePurchase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!purchase)
      return next(new CustomError(404, 'Invalid ID provided for purchase'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      purchase
    );
  } catch (error) {
    next(error);
  }
};

const getPurchase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findById(id);
    if (!purchase)
      return next(
        new CustomError(404, "There's no purchase with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      purchase
    );
  } catch (error) {
    next(error);
  }
};

const deletePurchase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByIdAndDelete(id);
    if (!purchase)
      return next(
        new CustomError(404, "There's no purchase with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', purchase);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPurchase,
  updatePurchase,
  getPurchases,
  getPurchase,
  deletePurchase,
};
