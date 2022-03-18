const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const validator = require('../../modules/validator.module');
const { createCardValidation } = require('./CardValidation');
const {
  createCard,
  updateCard,
  getCard,
  getCards,
  deleteCard,
} = require('./CardController');

router.post('/', Auth, Admin, createCardValidation, validator, createCard);

router.put('/:id', [Auth, isObjectId], updateCard);

router.get('/', [Auth, Admin], getCards);

router.get('/:id', isObjectId, getCard);

router.delete('/:id', [Auth, Admin], isObjectId, deleteCard);

module.exports = router;
