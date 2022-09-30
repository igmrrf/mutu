const Customer = require('./CustomerModel');
const CustomError = require('../../interfaces/http/errors/errorResponse');
const responseHandler = require('../../interfaces/http/response/successResponse');
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require('../../utils/auth.utils');
const { welcomeTemplate } = require('../../helpers/emails/templates/admin.templates');
const sendMail = require('../../modules/mail.module');

const AuthCustomer = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer)
      return next(new CustomError(404, 'Invalid Credentials provided'));
    const isValid = comparePassword(password, customer.password);
    if (!isValid)
      return next(new CustomError(401, 'Ensure you provide valid credentials'));
    const payload = { _id, name, branch };
    const token = generateToken(payload, '24h');
    return responseHandler(res, 200, 'Login Successful', {
      ...customer,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    const count = await Customer.countDocuments({});
    if (count === 0)
      return responseHandler(
        res,
        200,
        "There's are no customer(s) in the database"
      );
    return responseHandler(
      res,
      200,
      `There are ${count} customer(s)`,
      customers
    );
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const hashed = await hashPassword(req.body.password);
    const customer = new Customer({ ...req.body, password: hashed });
    await customer.save();
    const { _id, name, email } = customer;
    const payload = { _id, name, email };
    const token = generateToken(payload, '24h');
    if (process.env.NODE_ENV === 'development')
      await sendMail(
        req.body.email,
        'Welcome To MUTU',
        welcomeTemplate('Solomon', req.body.name)
      );
    return responseHandler(res, 201, 'Account Successfully Created', {
      token,
      name,
      email,
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!customer)
      return next(new CustomError(404, 'Invalid ID provided for customer'));

    return responseHandler(
      res,
      200,
      'Customer details successfully updated',
      customer
    );
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer)
      return new CustomError(404, "There's no customer with the specified ID");
    return responseHandler(
      res,
      200,
      'customer Object containing details',
      customer
    );
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer)
      return next(
        new CustomError(404, "There's no Customer with the specified ID")
      );
    return responseHandler(res, 200, 'customer successfully deleted', customer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomer,
  updateCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
  AuthCustomer,
};
