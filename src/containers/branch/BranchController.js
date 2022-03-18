const { Branch } = require('./BranchModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 });
    const count =await Branch.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no branch(es) in the database"
      );
    return responseHandler(res, 200, `There are ${count} branch(es)`, branches);
  } catch (error) {
    next(error);
  }
};

const createBranch = async (req, res, next) => {
  try {
    const branch = new Branch({ ...req.body });
    await branch.save();
    return responseHandler(res, 201, 'Account Successfully Created', branch);
  } catch (error) {
    next(error);
  }
};

const updateBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!branch)
      return next(new CustomError(404, 'Invalid ID provided for branch'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      branch
    );
  } catch (error) {
    next(error);
  }
};

const getBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findById(id);
    if (!branch)
      return next(
        new CustomError(404, "There's no branch with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      branch
    );
  } catch (error) {
    next(error);
  }
};

const deleteBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByIdAndDelete(id);
    if (!branch)
      return next(
        new CustomError(404, "There's no branch with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', branch);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBranch,
  updateBranch,
  getBranches,
  getBranch,
  deleteBranch,
};
