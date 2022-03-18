const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createAudit,
  updateAudit,
  getAudit,
  getAudits,
  deleteAudit,
} = require('./AuditController');

router.post('/', [Auth, Admin], createAudit);

router.put('/:id', [Auth, isObjectId], updateAudit);

router.get('/', [Auth, Admin], getAudits);

router.get('/:id', isObjectId, getAudit);

router.delete('/:id', [Auth, Admin], isObjectId, deleteAudit);

module.exports = router;
