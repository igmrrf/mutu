const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createReport,
  updateReport,
  getReport,
  getReports,
  deleteReport,
} = require('./ReportController');

router.post('/', [Auth, Admin], createReport);

router.put('/:id', [Auth, isObjectId], updateReport);

router.get('/', [Auth, Admin], getReports);

router.get('/:id', isObjectId, getReport);

router.delete('/:id', [Auth, Admin], isObjectId, deleteReport);

module.exports = router;
