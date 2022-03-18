const Dispute = require('./DisputeModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getDisputes = async (req, res, next) => {
  try {
    const disputes = await Dispute.find().sort({ createdAt: -1 });
    const count = await Dispute.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no dispute(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} dispute(s)`, disputes);
  } catch (error) {
    next(error);
  }
};

const createDispute = async (req, res, next) => {
  try {
    const dispute = new Dispute({ ...req.body });
    await dispute.save();
    return responseHandler(res, 201, 'Account Successfully Created', dispute);
  } catch (error) {
    next(error);
  }
};

const updateDispute = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dispute = await Dispute.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!dispute)
      return next(new CustomError(404, 'Invalid ID provided for dispute'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      dispute
    );
  } catch (error) {
    next(error);
  }
};

const getDispute = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dispute = await Dispute.findById(id);
    if (!dispute)
      return next(
        new CustomError(404, "There's no dispute with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      dispute
    );
  } catch (error) {
    next(error);
  }
};

const deleteDispute = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dispute = await Dispute.findByIdAndDelete(id);
    if (!dispute)
      return next(
        new CustomError(404, "There's no dispute with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', dispute);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDispute,
  updateDispute,
  getDisputes,
  getDispute,
  deleteDispute,
};
