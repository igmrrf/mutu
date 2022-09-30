const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createMail,
  updateMail,
  getMail,
  getMails,
  deleteMail,
} = require('./MailController');

router.post('/', [Auth, Admin], createMail);

router.put('/:id', [Auth, isObjectId], updateMail);

router.get('/', [Auth, Admin], getMails);

router.get('/:id', isObjectId, getMail);

router.delete('/:id', [Auth, Admin], isObjectId, deleteMail);

module.exports = router;
