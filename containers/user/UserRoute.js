const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const { CreateValidation } = require('./UserValidation');
const validator = require('../../modules/validator.module');
const {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  AuthUser,
} = require('./UserController');

router.post('/auth', AuthUser);

router.post('/', CreateValidation, validator, createUser);

router.put('/:id', [Auth, isObjectId], updateUser);

router.get('/', Auth, Admin, getUsers);

router.get('/:id', isObjectId, getUser);

router.delete('/:id', [Auth, Admin], isObjectId, deleteUser);

module.exports = router;
