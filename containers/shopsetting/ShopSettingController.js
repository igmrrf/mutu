const ShopSetting = require('./ShopSettingModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getShopSettings = async (req, res, next) => {
  try {
    const shopSettings = await ShopSetting.find().sort({ createdAt: -1 });
    const count = await ShopSetting.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no shopSetting(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} shopSetting(s)`,
      shopSettings
    );
  } catch (error) {
    next(error);
  }
};

const createShopSetting = async (req, res, next) => {
  try {
    const shopSetting = new ShopSetting({ ...req.body });
    await shopSetting.save();
    return responseHandler(
      res,
      201,
      'Account Successfully Created',
      shopSetting
    );
  } catch (error) {
    next(error);
  }
};

const updateShopSetting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shopSetting = await ShopSetting.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!shopSetting)
      return next(new CustomError(404, 'Invalid ID provided for shopSetting'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      shopSetting
    );
  } catch (error) {
    next(error);
  }
};

const getShopSetting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shopSetting = await ShopSetting.findById(id);
    if (!shopSetting)
      return next(
        new CustomError(404, "There's no shopSetting with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      shopSetting
    );
  } catch (error) {
    next(error);
  }
};

const deleteShopSetting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shopSetting = await ShopSetting.findByIdAndDelete(id);
    if (!shopSetting)
      return next(
        new CustomError(404, "There's no shopSetting with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer successfully deleted',
      shopSetting
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShopSetting,
  updateShopSetting,
  getShopSettings,
  getShopSetting,
  deleteShopSetting,
};
