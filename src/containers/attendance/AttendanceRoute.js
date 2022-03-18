const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const validator = require('../../modules/validator.module');
const { createAttendanceValidation } = require('./AttendanceValidation');
const {
  createAttendance,
  updateAttendance,
  getAttendance,
  getAttendances,
  deleteAttendance,
} = require('./AttendanceController');

router.post(
  '/',
  [Auth, Admin],
  createAttendanceValidation,
  validator,
  createAttendance
);

router.put('/:id', [Auth, isObjectId], updateAttendance);

router.get('/', [Auth, Admin], getAttendances);

router.get('/:id', isObjectId, getAttendance);

router.delete('/:id', [Auth, Admin], isObjectId, deleteAttendance);

module.exports = router;
