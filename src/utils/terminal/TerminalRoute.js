const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const validator = require('../../modules/validator.module');
const { createTerminalValidation } = require('./TerminalValidation');
const {
  createTerminal,
  updateTerminal,
  getTerminal,
  getTerminals,
  deleteTerminal,
} = require('./TerminalController');

router.post(
  '/',
  [Auth, Admin],
  createTerminalValidation,
  validator,
  createTerminal
);

router.put('/:id', [Auth, isObjectId], updateTerminal);

router.get('/', [Auth, Admin], getTerminals);

router.get('/:id', isObjectId, getTerminal);

router.delete('/:id', [Auth, Admin], isObjectId, deleteTerminal);

module.exports = router;
