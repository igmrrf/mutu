const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createDispute,
  updateDispute,
  getDispute,
  getDisputes,
  deleteDispute,
} = require('./DisputeController');

router.post('/', [Auth, Admin], createDispute);

router.put('/:id', [Auth, isObjectId], updateDispute);

router.get('/', [Auth, Admin], getDisputes);

router.get('/:id', isObjectId, getDispute);

router.delete('/:id', [Auth, Admin], isObjectId, deleteDispute);

module.exports = router;
