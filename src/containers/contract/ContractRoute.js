const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createContract,
  updateContract,
  getContract,
  getContracts,
  deleteContract,
} = require('./ContractController');

router.post('/', [Auth, Admin], createContract);

router.put('/:id', [Auth, Admin, isObjectId], updateContract);

router.get('/', [Auth, Admin], getContracts);

router.get('/:id', isObjectId, getContract);

router.delete('/:id', [Auth, Admin], isObjectId, deleteContract);

module.exports = router;
