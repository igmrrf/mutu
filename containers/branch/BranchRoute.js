const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const validator = require('../../modules/validator.module');
const { createBranchValidation } = require('./BranchValidation');
const {
  createBranch,
  updateBranch,
  getBranch,
  getBranches,
  deleteBranch,
} = require('./BranchController');

router.post(
  '/',
  [Auth, Admin],
  createBranchValidation,
  validator,
  createBranch
);

router.put('/:id', [Auth, isObjectId], updateBranch);

router.get('/', [Auth, Admin], getBranches);

router.get('/:id', isObjectId, getBranch);

router.delete('/:id', [Auth, Admin], isObjectId, deleteBranch);

module.exports = router;
