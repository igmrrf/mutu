const Claim = require('./ClaimModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getClaims = async (req, res, next) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 });
    const count = await Claim.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no claim(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} claim(s)`, claims);
  } catch (error) {
    next(error);
  }
};

const createClaim = async (req, res, next) => {
  try {
    const claim = new Claim({ ...req.body });
    await claim.save();
    return responseHandler(res, 201, 'Account Successfully Created', claim);
  } catch (error) {
    next(error);
  }
};

const updateClaim = async (req, res, next) => {
  try {
    const { id } = req.params;
    const claim = await Claim.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!claim)
      return next(new CustomError(404, 'Invalid ID provided for claim'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      claim
    );
  } catch (error) {
    next(error);
  }
};

const getClaim = async (req, res, next) => {
  try {
    const { id } = req.params;
    const claim = await Claim.findById(id);
    if (!claim)
      return next(
        new CustomError(404, "There's no claim with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      claim
    );
  } catch (error) {
    next(error);
  }
};

const deleteClaim = async (req, res, next) => {
  try {
    const { id } = req.params;
    const claim = await Claim.findByIdAndDelete(id);
    if (!claim)
      return next(
        new CustomError(404, "There's no claim with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', claim);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClaim,
  updateClaim,
  getClaims,
  getClaim,
  deleteClaim,
};
