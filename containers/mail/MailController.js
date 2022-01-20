const Mail = require('./MailModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getMails = async (req, res, next) => {
  try {
    const mails = await Mail.find().sort({ createdAt: -1 });
    const count = await Mail.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no mail(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} mail(s)`, mails);
  } catch (error) {
    next(error);
  }
};

const createMail = async (req, res, next) => {
  try {
    const mail = new Mail({ ...req.body });
    await mail.save();
    return responseHandler(res, 201, 'Account Successfully Created', mail);
  } catch (error) {
    next(error);
  }
};

const updateMail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mail = await Mail.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!mail)
      return next(new CustomError(404, 'Invalid ID provided for mail'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      mail
    );
  } catch (error) {
    next(error);
  }
};

const getMail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mail = await Mail.findById(id);
    if (!mail)
      return next(
        new CustomError(404, "There's no mail with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      mail
    );
  } catch (error) {
    next(error);
  }
};

const deleteMail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mail = await Mail.findByIdAndDelete(id);
    if (!mail)
      return next(
        new CustomError(404, "There's no mail with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', mail);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMail,
  updateMail,
  getMails,
  getMail,
  deleteMail,
};
