const { body } = require('express-validator');
const Attendace = require('./AttendanceModel');

const createAttendanceValidation = [
  body('date').custom((value, {}) => {
    return Attendace.findOne({ date: value }).then((attendance) => {
      if (attendance)
        return Promise.reject("There's an attendance for this date already");
      return true;
    });
  }),
];

module.exports = { createAttendanceValidation };
