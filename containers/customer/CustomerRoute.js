const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createCustomer,
  updateCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
} = require('./CustomerController');

router.post('/', createCustomer);

router.put('/:id', [Auth, isObjectId], updateCustomer);

router.get('/', [Auth, Admin], getCustomers);

router.get('/:id', [Auth, isObjectId], getCustomer);

router.delete('/:id', [Auth, Admin], isObjectId, deleteCustomer);

module.exports = router;
