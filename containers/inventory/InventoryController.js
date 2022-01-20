const Inventory = require('./InventoryModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getInventorys = async (req, res, next) => {
  try {
    const inventorys = await Inventory.find().sort({ createdAt: -1 });
    const count = await Inventory.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no inventory(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} inventory(s)`,
      inventorys
    );
  } catch (error) {
    next(error);
  }
};

const createInventory = async (req, res, next) => {
  try {
    const inventory = new Inventory({ ...req.body });
    await inventory.save();
    return responseHandler(res, 201, 'Account Successfully Created', inventory);
  } catch (error) {
    next(error);
  }
};

const updateInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!inventory)
      return next(new CustomError(404, 'Invalid ID provided for inventory'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      inventory
    );
  } catch (error) {
    next(error);
  }
};

const getInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id);
    if (!inventory)
      return next(
        new CustomError(404, "There's no inventory with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      inventory
    );
  } catch (error) {
    next(error);
  }
};

const deleteInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findByIdAndDelete(id);
    if (!inventory)
      return next(
        new CustomError(404, "There's no inventory with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer successfully deleted',
      inventory
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInventory,
  updateInventory,
  getInventorys,
  getInventory,
  deleteInventory,
};
