const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createPurchase,
  updatePurchase,
  getPurchase,
  getPurchases,
  deletePurchase,
} = require('./PurchaseController');

router.post('/', [Auth, Admin], createPurchase);

router.put('/:id', [Auth, isObjectId], updatePurchase);

router.get('/', [Auth, Admin], getPurchases);

router.get('/:id', isObjectId, getPurchase);

router.delete('/:id', [Auth, Admin], isObjectId, deletePurchase);

module.exports = router;
