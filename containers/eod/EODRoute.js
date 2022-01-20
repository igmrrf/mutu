const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createEOD,
  updateEOD,
  getEOD,
  getEODs,
  deleteEOD,
} = require('./EODController');

router.post('/', [Auth, Admin], createEOD);

router.put('/:id', [Auth, isObjectId], updateEOD);

router.get('/', [Auth, Admin], getEODs);

router.get('/:id', isObjectId, getEOD);

router.delete('/:id', [Auth, Admin], isObjectId, deleteEOD);

module.exports = router;
