const Invoice = require('./InvoiceModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');

const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    const count = await Invoice.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no invoice(s) in the database"
      );
    return responseHandler(res, 200, `There are ${count} invoice(s)`, invoices);
  } catch (error) {
    next(error);
  }
};

const createInvoice = async (req, res, next) => {
  try {
    const invoice = new invoice({ ...req.body });
    await invoice.save();
    return responseHandler(res, 201, 'Account Successfully Created', invoice);
  } catch (error) {
    next(error);
  }
};

const updateInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!invoice)
      return next(new CustomError(404, 'Invalid ID provided for invoice'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      invoice
    );
  } catch (error) {
    next(error);
  }
};

const getInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    if (!invoice)
      return next(
        new CustomError(404, "There's no invoice with the specified ID")
      );
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      invoice
    );
  } catch (error) {
    next(error);
  }
};

const deleteInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice)
      return next(
        new CustomError(404, "There's no invoice with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', invoice);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInvoice,
  updateInvoice,
  getInvoices,
  getInvoice,
  deleteInvoice,
};
