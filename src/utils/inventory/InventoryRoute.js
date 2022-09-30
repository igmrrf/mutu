const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createInventory,
  updateInventory,
  getInventory,
  getInventorys,
  deleteInventory,
} = require('./InventoryController');

router.post('/', [Auth, Admin], createInventory);

router.put('/:id', [Auth, isObjectId], updateInventory);

router.get('/', [Auth, Admin], getInventorys);

router.get('/:id', isObjectId, getInventory);

router.delete('/:id', [Auth, Admin], isObjectId, deleteInventory);

module.exports = router;
