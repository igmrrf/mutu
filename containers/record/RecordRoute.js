const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createRecord,
  updateRecord,
  getRecord,
  getRecords,
  deleteRecord,
} = require('./RecordController');

router.post('/', [Auth, Admin], createRecord);

router.put('/:id', [Auth, isObjectId], updateRecord);

router.get('/', [Auth, Admin], getRecords);

router.get('/:id', isObjectId, getRecord);

router.delete('/:id', [Auth, Admin], isObjectId, deleteRecord);

module.exports = router;
