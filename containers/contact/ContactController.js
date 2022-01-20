const Contact = require('./ContactModel');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const count = await Contact.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no contact(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} contact(s)`, contacts);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const contact = new Contact({ ...req.body });
    await contact.save();
    return responseHandler(res, 201, 'Account Successfully Created', contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!contact)
      return next(new CustomError(404, 'Invalid ID provided for contact'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      contact
    );
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact)
      return next(
        new CustomError(404, "There's no contact with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      contact
    );
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact)
      return next(
        new CustomError(404, "There's no contact with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  updateContact,
  getContacts,
  getContact,
  deleteContact,
};
