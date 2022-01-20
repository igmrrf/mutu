const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createQuote,
  updateQuote,
  getQuote,
  getQuotes,
  deleteQuote,
} = require('./QuoteController');

router.post('/', [Auth, Admin], createQuote);

router.put('/:id', [Auth, isObjectId], updateQuote);

router.get('/', [Auth, Admin], getQuotes);

router.get('/:id', isObjectId, getQuote);

router.delete('/:id', [Auth, Admin], isObjectId, deleteQuote);

module.exports = router;
