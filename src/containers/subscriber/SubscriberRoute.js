const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createSubscriber,
  updateSubscriber,
  getSubscriber,
  getSubscribers,
  deleteSubscriber,
} = require('./SubscriberController');

router.post('/', [Auth, Admin], createSubscriber);

router.put('/:id', [Auth, isObjectId], updateSubscriber);

router.get('/', [Auth, Admin], getSubscribers);

router.get('/:id', isObjectId, getSubscriber);

router.delete('/:id', [Auth, Admin], isObjectId, deleteSubscriber);

module.exports = router;
