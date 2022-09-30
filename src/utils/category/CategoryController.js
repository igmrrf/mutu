const Category = require('./CategoryModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getCategorys = async (req, res, next) => {
  try {
    const categorys = await Category.find().sort({ createdAt: -1 });
    const count = await Category.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no category(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} category(s)`,
      categorys
    );
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = new Category({ ...req.body });
    await category.save();
    return responseHandler(res, 201, 'Account Successfully Created', category);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!category)
      return next(new CustomError(404, 'Invalid ID provided for category'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      category
    );
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category)
      return next(
        new CustomError(404, "There's no category with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      category
    );
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category)
      return next(
        new CustomError(404, "There's no category with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getCategorys,
  getCategory,
  deleteCategory,
};
