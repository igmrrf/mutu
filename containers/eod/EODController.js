const EOD = require('./EODModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getEODs = async (req, res, next) => {
  try {
    const eods = await EOD.find().sort({ createdAt: -1 });
    const count = await EOD.countDocuments({});
    if (count === 0)
      return responseHandler(res, 200, "There's are no eod(s) in the database");
    return responseHandler(res, 200, `There are ${count} eod(s)`, eods);
  } catch (error) {
    next(error);
  }
};

const createEOD = async (req, res, next) => {
  try {
    const eod = new EOD({ ...req.body });
    await eod.save();
    return responseHandler(res, 201, 'Account Successfully Created', eod);
  } catch (error) {
    next(error);
  }
};

const updateEOD = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eod = await EOD.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!eod) return next(new CustomError(404, 'Invalid ID provided for eod'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      eod
    );
  } catch (error) {
    next(error);
  }
};

const getEOD = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eod = await EOD.findById(id);
    if (!eod)
      return next(new CustomError(404, "There's no eod with the specified ID"));
    return responseHandler(res, 200, 'customer Object containing details', eod);
  } catch (error) {
    next(error);
  }
};

const deleteEOD = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eod = await EOD.findByIdAndDelete(id);
    if (!eod)
      return next(new CustomError(404, "There's no eod with the specified ID"));
    return responseHandler(res, 200, 'customer successfully deleted', eod);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEOD,
  updateEOD,
  getEODs,
  getEOD,
  deleteEOD,
};
