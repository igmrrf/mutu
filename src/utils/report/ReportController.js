const Report = require('./ReportModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getReports = async (req, res, next) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    const count = await Report.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no report(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} report(s)`, reports);
  } catch (error) {
    next(error);
  }
};

const createReport = async (req, res, next) => {
  try {
    const report = new Report({ ...req.body });
    await report.save();
    return responseHandler(res, 201, 'Account Successfully Created', report);
  } catch (error) {
    next(error);
  }
};

const updateReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await Report.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!report)
      return next(new CustomError(404, 'Invalid ID provided for report'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      report
    );
  } catch (error) {
    next(error);
  }
};

const getReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report)
      return next(
        new CustomError(404, "There's no report with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      report
    );
  } catch (error) {
    next(error);
  }
};

const deleteReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await Report.findByIdAndDelete(id);
    if (!report)
      return next(
        new CustomError(404, "There's no report with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', report);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReport,
  updateReport,
  getReports,
  getReport,
  deleteReport,
};
