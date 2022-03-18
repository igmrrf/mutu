const Product = require('./ProductModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    const count = await Product.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no Product(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} Product(s)`, products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = new Product({ ...req.body });
    await product.save();
    return responseHandler(res, 201, 'Account Successfully Created', product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!product)
      return next(new CustomError(404, 'Invalid ID provided for Product'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      product
    );
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return next(
        new CustomError(404, "There's no Product with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      product
    );
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return next(
        new CustomError(404, "There's no Product with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
};
