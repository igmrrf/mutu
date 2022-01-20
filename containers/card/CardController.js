const { Card, cardTypes } = require('./CardModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    const count = await Card.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no Card(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} Card(s)`, cards);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const card = new Card({ ...req.body });
    await card.save();
    return responseHandler(res, 201, 'Account Successfully Created', card);
  } catch (error) {
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!card)
      return next(new CustomError(404, 'Invalid ID provided for Card'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      card
    );
  } catch (error) {
    next(error);
  }
};

const getCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card)
      return next(
        new CustomError(404, "There's no Card with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      card
    );
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);
    if (!card)
      return next(
        new CustomError(404, "There's no Card with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', card);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCard,
  updateCard,
  getCards,
  getCard,
  deleteCard,
};
