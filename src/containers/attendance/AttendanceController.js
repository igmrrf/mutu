const Attendance = require('./AttendanceModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getAttendances = async (req, res, next) => {
  try {
    const attendances = await Attendance.find().sort({ createdAt: -1 });
    const count = await Attendance.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no attendance(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} attendance(s)`,
      attendances
    );
  } catch (error) {
    next(error);
  }
};

const createAttendance = async (req, res, next) => {
  try {
    const attendance = new Attendance({ ...req.body });
    await attendance.save();
    return responseHandler(
      res,
      201,
      'Attendance Successfully Created',
      attendance
    );
  } catch (error) {
    next(error);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!attendance)
      return next(new CustomError(404, 'Invalid ID provided for attendance'));

    return responseHandler(
      res,
      200,
      'Attendance details successfully updated',
      attendance
    );
  } catch (error) {
    next(error);
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findById(id);
    if (!attendance)
      return next(
        new CustomError(404, "There's no attendance with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'Attendance Object containing details',
      attendance
    );
  } catch (error) {
    next(error);
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance)
      return next(
        new CustomError(404, "There's no attendance with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'Attendance successfully deleted',
      attendance
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAttendance,
  updateAttendance,
  getAttendances,
  getAttendance,
  deleteAttendance,
};
