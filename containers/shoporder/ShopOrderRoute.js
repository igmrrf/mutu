const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createShopOrder,
  updateShopOrder,
  getShopOrder,
  getShopOrders,
  deleteShopOrder,
} = require('./ShopOrderController');

router.post('/', [Auth, Admin], createShopOrder);

router.put('/:id', [Auth, isObjectId], updateShopOrder);

router.get('/', [Auth, Admin], getShopOrders);

router.get('/:id', isObjectId, getShopOrder);

router.delete('/:id', [Auth, Admin], isObjectId, deleteShopOrder);

module.exports = router;
