const Audit = require('./AuditModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getAudits = async (req, res, next) => {
  try {
    const audits = await Audit.find().sort({ createdAt: -1 });
    const count =await Audit.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no audit(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} audit(s)`, audits);
  } catch (error) {
    next(error);
  }
};

const createAudit = async (req, res, next) => {
  try {
    const audit = new Audit({ ...req.body });
    await audit.save();
    return responseHandler(res, 201, 'Account Successfully Created', audit);
  } catch (error) {
    next(error);
  }
};

const updateAudit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const audit = await Audit.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!audit)
      return next(new CustomError(404, 'Invalid ID provided for audit'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      audit
    );
  } catch (error) {
    next(error);
  }
};

const getAudit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const audit = await Audit.findById(id);
    if (!audit)
      return next(
        new CustomError(404, "There's no audit with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      audit
    );
  } catch (error) {
    next(error);
  }
};

const deleteAudit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const audit = await Audit.findByIdAndDelete(id);
    if (!audit)
      return next(
        new CustomError(404, "There's no audit with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', audit);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAudit,
  updateAudit,
  getAudits,
  getAudit,
  deleteAudit,
};
