const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createExpense,
  updateExpense,
  getExpense,
  getExpenses,
  deleteExpense,
} = require('./ExpenseController');

router.post('/', [Auth, Admin], createExpense);

router.put('/:id', [Auth, isObjectId], updateExpense);

router.get('/', [Auth, Admin], getExpenses);

router.get('/:id', isObjectId, getExpense);

router.delete('/:id', [Auth, Admin], isObjectId, deleteExpense);

module.exports = router;
