const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createInvoice,
  updateInvoice,
  getInvoice,
  getInvoices,
  deleteInvoice,
} = require('./InvoiceController');

router.post('/', [Auth, Admin], createInvoice);

router.put('/:id', [Auth, isObjectId], updateInvoice);

router.get('/', [Auth, Admin], getInvoices);

router.get('/:id', isObjectId, getInvoice);

router.delete('/:id', [Auth, Admin], isObjectId, deleteInvoice);

module.exports = router;
