const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const validator = require('../../modules/validator.module');
const { createTransactionValidation } = require('./TransactionValidation');
const {
  createTransaction,
  updateTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
} = require('./TransactionController');

router.post(
  '/',
  [Auth, Admin],
  createTransactionValidation,
  validator,
  createTransaction
);

router.put('/:id', [Auth, isObjectId], updateTransaction);

router.get('/', [Auth, Admin], getTransactions);

router.get('/:id', isObjectId, getTransaction);

router.delete('/:id', [Auth, Admin], isObjectId, deleteTransaction);

module.exports = router;
