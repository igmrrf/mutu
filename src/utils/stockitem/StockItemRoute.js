const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createStockItem,
  updateStockItem,
  getStockItem,
  getStockItems,
  deleteStockItem,
} = require('./StockItemController');

router.post('/', [Auth, Admin], createStockItem);

router.put('/:id', [Auth, isObjectId], updateStockItem);

router.get('/', [Auth, Admin], getStockItems);

router.get('/:id', isObjectId, getStockItem);

router.delete('/:id', [Auth, Admin], isObjectId, deleteStockItem);

module.exports = router;
