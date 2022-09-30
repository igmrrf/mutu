const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createOrder,
  updateOrder,
  getOrder,
  getOrders,
  deleteOrder,
} = require('./OrderController');

router.post('/', [Auth, Admin], createOrder);

router.put('/:id', [Auth, isObjectId], updateOrder);

router.get('/', [Auth, Admin], getOrders);

router.get('/:id', isObjectId, getOrder);

router.delete('/:id', [Auth, Admin], isObjectId, deleteOrder);

module.exports = router;
