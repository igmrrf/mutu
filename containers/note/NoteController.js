const Note = require('./NoteModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    const count = await Note.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no note(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} note(s)`, notes);
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const note = new Note({ ...req.body });
    await note.save();
    return responseHandler(res, 201, 'Account Successfully Created', note);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!note)
      return next(new CustomError(404, 'Invalid ID provided for note'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      note
    );
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note)
      return next(
        new CustomError(404, "There's no note with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      note
    );
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note)
      return next(
        new CustomError(404, "There's no note with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', note);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  updateNote,
  getNotes,
  getNote,
  deleteNote,
};
