const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createProject,
  updateProject,
  getProject,
  getProjects,
  deleteProject,
} = require('./ProjectController');

router.post('/', [Auth, Admin], createProject);

router.put('/:id', [Auth, isObjectId], updateProject);

router.get('/', [Auth, Admin], getProjects);

router.get('/:id', isObjectId, getProject);

router.delete('/:id', [Auth, Admin], isObjectId, deleteProject);

module.exports = router;
