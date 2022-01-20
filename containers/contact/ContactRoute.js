const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createContact,
  updateContact,
  getContact,
  getContacts,
  deleteContact,
} = require('./ContactController');

router.post('/', [Auth, Admin], createContact);

router.put('/:id', [Auth, Admin, isObjectId], updateContact);

router.get('/', [Auth, Admin], getContacts);

router.get('/:id', isObjectId, getContact);

router.delete('/:id', [Auth, Admin], isObjectId, deleteContact);

module.exports = router;
