const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createReceipt,
  updateReceipt,
  getReceipt,
  getReceipts,
  deleteReceipt,
} = require('./ReceiptController');

router.post('/', [Auth, Admin], createReceipt);

router.put('/:id', [Auth, isObjectId], updateReceipt);

router.get('/', [Auth, Admin], getReceipts);

router.get('/:id', isObjectId, getReceipt);

router.delete('/:id', [Auth, Admin], isObjectId, deleteReceipt);

module.exports = router;
