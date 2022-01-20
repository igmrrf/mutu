const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createAccesslog,
  updateAccesslog,
  getAccesslog,
  getAccesslogs,
  deleteAccesslog,
} = require('./AccessLogController');

router.post('/', [Auth, Admin], createAccesslog);

router.put('/:id', [Auth, isObjectId], updateAccesslog);

router.get('/', [Auth, Admin], getAccesslogs);

router.get('/:id', isObjectId, getAccesslog);

router.delete('/:id', [Auth, Admin], isObjectId, deleteAccesslog);

module.exports = router;
