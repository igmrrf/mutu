const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createClaim,
  updateClaim,
  getClaim,
  getClaims,
  deleteClaim,
} = require('./ClaimController');

router.post('/', [Auth, Admin], createClaim);

router.put('/:id', [Auth, isObjectId], updateClaim);

router.get('/', [Auth, Admin], getClaims);

router.get('/:id', isObjectId, getClaim);

router.delete('/:id', [Auth, Admin], isObjectId, deleteClaim);

module.exports = router;
