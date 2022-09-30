const Subscriber = require('./SubscriberModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    const count = await Subscriber.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no subscriber(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} subscriber(s)`,
      subscribers
    );
  } catch (error) {
    next(error);
  }
};

const createSubscriber = async (req, res, next) => {
  try {
    const subscriber = new Subscriber({ ...req.body });
    await subscriber.save();
    return responseHandler(
      res,
      201,
      'Account Successfully Created',
      subscriber
    );
  } catch (error) {
    next(error);
  }
};

const updateSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!subscriber)
      return next(new CustomError(404, 'Invalid ID provided for subscriber'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      subscriber
    );
  } catch (error) {
    next(error);
  }
};

const getSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.findById(id);
    if (!subscriber)
      return next(
        new CustomError(404, "There's no subscriber with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      subscriber
    );
  } catch (error) {
    next(error);
  }
};

const deleteSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.findByIdAndDelete(id);
    if (!subscriber)
      return next(
        new CustomError(404, "There's no subscriber with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer successfully deleted',
      subscriber
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubscriber,
  updateSubscriber,
  getSubscribers,
  getSubscriber,
  deleteSubscriber,
};
