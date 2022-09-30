const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createPaymentMethod,
  updatePaymentMethod,
  getPaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
} = require('./PaymentMethodController');

router.post('/', [Auth, Admin], createPaymentMethod);

router.put('/:id', [Auth, isObjectId], updatePaymentMethod);

router.get('/', [Auth, Admin], getPaymentMethods);

router.get('/:id', isObjectId, getPaymentMethod);

router.delete('/:id', [Auth, Admin], isObjectId, deletePaymentMethod);

module.exports = router;
