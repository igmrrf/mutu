const Record = require('./RecordModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getRecords = async (req, res, next) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    const count = await Record.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no record(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} record(s)`, records);
  } catch (error) {
    next(error);
  }
};

const createRecord = async (req, res, next) => {
  try {
    const record = new Record({ ...req.body });
    await record.save();
    return responseHandler(res, 201, 'Account Successfully Created', record);
  } catch (error) {
    next(error);
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await Record.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!record)
      return next(new CustomError(404, 'Invalid ID provided for record'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      record
    );
  } catch (error) {
    next(error);
  }
};

const getRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id);
    if (!record)
      return next(
        new CustomError(404, "There's no record with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      record
    );
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await Record.findByIdAndDelete(id);
    if (!record)
      return next(
        new CustomError(404, "There's no record with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', record);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecord,
  updateRecord,
  getRecords,
  getRecord,
  deleteRecord,
};
