const Accesslog = require('./AccessLogModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getAccesslogs = async (req, res, next) => {
  try {
    const accesslogs = await Accesslog.find().sort({ createdAt: -1 });
    const count = await Accesslog.countDocuments({});
    console.log(count);
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no accesslog(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} accesslog(s)`,
      accesslogs
    );
  } catch (error) {
    next(error);
  }
};

const createAccesslog = async (req, res, next) => {
  try {
    const accesslog = new Accesslog({ ...req.body });
    await accesslog.save();
    return responseHandler(
      res,
      201,
      'Accesslog Successfully Created',
      accesslog
    );
  } catch (error) {
    next(error);
  }
};

const updateAccesslog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const accesslog = await Accesslog.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!accesslog)
      return next(new CustomError(404, 'Invalid ID provided for accesslog'));

    return responseHandler(
      res,
      200,
      'Accesslog details successfully updated',
      accesslog
    );
  } catch (error) {
    next(error);
  }
};

const getAccesslog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const accesslog = await Accesslog.findById(id);
    if (!accesslog)
      return next(
        new CustomError(404, "There's no accesslog with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'Accesslog Object containing details',
      accesslog
    );
  } catch (error) {
    next(error);
  }
};

const deleteAccesslog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const accesslog = await Accesslog.findByIdAndDelete(id);
    if (!accesslog)
      return next(
        new CustomError(404, "There's no accesslog with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'Accesslog successfully deleted',
      accesslog
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAccesslog,
  updateAccesslog,
  getAccesslogs,
  getAccesslog,
  deleteAccesslog,
};
