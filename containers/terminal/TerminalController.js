const Terminal = require('./TerminalModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getTerminals = async (req, res, next) => {
  try {
    const terminals = await Terminal.find().sort({ createdAt: -1 });
    const count = await Terminal.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no terminal(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} terminal(s)`,
      terminals
    );
  } catch (error) {
    next(error);
  }
};

const createTerminal = async (req, res, next) => {
  try {
    const terminal = new Terminal({ ...req.body });
    await terminal.save();
    return responseHandler(res, 201, 'Account Successfully Created', terminal);
  } catch (error) {
    next(error);
  }
};

const updateTerminal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const terminal = await Terminal.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!terminal)
      return next(new CustomError(404, 'Invalid ID provided for terminal'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      terminal
    );
  } catch (error) {
    next(error);
  }
};

const getTerminal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const terminal = await Terminal.findById(id);
    if (!terminal)
      return next(
        new CustomError(404, "There's no terminal with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      terminal
    );
  } catch (error) {
    next(error);
  }
};

const deleteTerminal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const terminal = await Terminal.findByIdAndDelete(id);
    if (!terminal)
      return next(
        new CustomError(404, "There's no terminal with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', terminal);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTerminal,
  updateTerminal,
  getTerminals,
  getTerminal,
  deleteTerminal,
};
