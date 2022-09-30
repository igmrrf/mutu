const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createNote,
  updateNote,
  getNote,
  getNotes,
  deleteNote,
} = require('./NoteController');

router.post('/', [Auth, Admin], createNote);

router.put('/:id', [Auth, isObjectId], updateNote);

router.get('/', [Auth, Admin], getNotes);

router.get('/:id', isObjectId, getNote);

router.delete('/:id', [Auth, Admin], isObjectId, deleteNote);

module.exports = router;
