const StockItem = require('./StockItemModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getStockItems = async (req, res, next) => {
  try {
    const stockItems = await StockItem.find().sort({ createdAt: -1 });
    const count = await StockItem.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no stockItem(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} stockItem(s)`,
      stockItems
    );
  } catch (error) {
    next(error);
  }
};

const createStockItem = async (req, res, next) => {
  try {
    const stockItem = new StockItem({ ...req.body });
    await stockItem.save();
    return responseHandler(res, 201, 'Account Successfully Created', stockItem);
  } catch (error) {
    next(error);
  }
};

const updateStockItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stockItem = await StockItem.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!stockItem)
      return next(new CustomError(404, 'Invalid ID provided for stockItem'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      stockItem
    );
  } catch (error) {
    next(error);
  }
};

const getStockItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stockItem = await StockItem.findById(id);
    if (!stockItem)
      return next(
        new CustomError(404, "There's no stockItem with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      stockItem
    );
  } catch (error) {
    next(error);
  }
};

const deleteStockItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stockItem = await StockItem.findByIdAndDelete(id);
    if (!stockItem)
      return next(
        new CustomError(404, "There's no stockItem with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer successfully deleted',
      stockItem
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStockItem,
  updateStockItem,
  getStockItems,
  getStockItem,
  deleteStockItem,
};
