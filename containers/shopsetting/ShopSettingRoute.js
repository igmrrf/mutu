const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createShopSetting,
  updateShopSetting,
  getShopSetting,
  getShopSettings,
  deleteShopSetting,
} = require('./ShopSettingController');

router.post('/', [Auth, Admin], createShopSetting);

router.put('/:id', [Auth, isObjectId], updateShopSetting);

router.get('/', [Auth, Admin], getShopSettings);

router.get('/:id', isObjectId, getShopSetting);

router.delete('/:id', [Auth, Admin], isObjectId, deleteShopSetting);

module.exports = router;
