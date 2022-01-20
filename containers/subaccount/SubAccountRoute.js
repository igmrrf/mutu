const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createSubAccount,
  updateSubAccount,
  getSubAccount,
  getSubAccounts,
  deleteSubAccount,
} = require('./SubAccountController');

router.post('/', [Auth, Admin], createSubAccount);

router.put('/:id', [Auth, isObjectId], updateSubAccount);

router.get('/', [Auth, Admin], getSubAccounts);

router.get('/:id', isObjectId, getSubAccount);

router.delete('/:id', [Auth, Admin], isObjectId, deleteSubAccount);

module.exports = router;
