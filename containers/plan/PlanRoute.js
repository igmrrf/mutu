const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createPlan,
  updatePlan,
  getPlan,
  getPlans,
  deletePlan,
} = require('./PlanController');

router.post('/', [Auth, Admin], createPlan);

router.put('/:id', [Auth, isObjectId], updatePlan);

router.get('/', [Auth, Admin], getPlans);

router.get('/:id', isObjectId, getPlan);

router.delete('/:id', [Auth, Admin], isObjectId, deletePlan);

module.exports = router;
