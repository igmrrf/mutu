const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createPayment,
  updatePayment,
  getPayment,
  getPayments,
  deletePayment,
} = require('./PaymentController');

router.post('/', [Auth, Admin], createPayment);

router.put('/:id', [Auth, isObjectId], updatePayment);

router.get('/', [Auth, Admin], getPayments);

router.get('/:id', isObjectId, getPayment);

router.delete('/:id', [Auth, Admin], isObjectId, deletePayment);

module.exports = router;
