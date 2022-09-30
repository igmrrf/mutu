const Plan = require('./PlanModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    const count = await Plan.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no plan(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} plan(s)`, plans);
  } catch (error) {
    next(error);
  }
};

const createPlan = async (req, res, next) => {
  try {
    const plan = new Plan({ ...req.body });
    await plan.save();
    return responseHandler(res, 201, 'Account Successfully Created', plan);
  } catch (error) {
    next(error);
  }
};

const updatePlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!plan)
      return next(new CustomError(404, 'Invalid ID provided for plan'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      plan
    );
  } catch (error) {
    next(error);
  }
};

const getPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById(id);
    if (!plan)
      return next(
        new CustomError(404, "There's no plan with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      plan
    );
  } catch (error) {
    next(error);
  }
};

const deletePlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByIdAndDelete(id);
    if (!plan)
      return next(
        new CustomError(404, "There's no plan with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', plan);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPlan,
  updatePlan,
  getPlans,
  getPlan,
  deletePlan,
};
