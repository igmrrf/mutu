const hostname = require('os').hostname();
const User = require('./UserModel');
const sendMail = require('../../modules/mail.module');
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require('../../utils/auth.utils');
const CustomError = require('../../utils/responses/errorResponse');
const responseHandler = require('../../utils/responses/successResponse');
const { welcomeTemplate } = require('../../utils/templates/user.email');

const AuthUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return next(new CustomError(404, 'Invalid Credentials provided'));
    const isValid = comparePassword(password, user.password);
    if (!isValid)
      return next(new CustomError(401, 'Ensure you provide valid credentials'));

    const payload = (({ _id, name, branch }) => ({ _id, name, branch }))(user);
    console.log(payload);
    console.log(user);
    const token = generateToken(payload, '24h');
    return responseHandler(res, 200, 'Login Successful', {
      token,
      ...user,
    });
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  const { password, name, branch, email } = req.body;
  const hashed = await hashPassword(password);

  const user = new User({
    ...req.body,
    password: hashed,
  });
  await user.save();
  const token = generateToken({ id: user._id, name, branch }, '24h');
  if (process.env.NODE_ENV === 'development')
    await sendMail(email, 'Welcome To MUTU', welcomeTemplate('Torama', name));
  return responseHandler(res, 201, 'Account Successfully Created', {
    token,
    email,
  });
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, mobile } = req.body;

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { name, email, mobile } }
    );
    if (!user)
      return next(
        new CustomError(404, "User ID provided for no doesn't exits")
      );
    return responseHandler(res, 200, 'User details successfully updated', user);
  } catch (error) {
    next(error);
  }
};

const uploaduserImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      file: { filename },
      protocol,
    } = req;
    if (file && hostname.includes('torama')) url = 'https://api.torshop.ng';
    else url = `${protocol}://${filename}`;
    const path = `${url}/uploads/users_images/${filename}`;

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { image: path } }
    );
    if (!user)
      return next(new CustomError(404, 'Invalid ID provided for user'));

    return responseHandler(res, 200, 'user details successfully updated', user);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return next(
        new CustomError(404, "There's no user with the specified ID")
      );

    return responseHandler(res, 200, 'user Object containing details', user);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const count = await User.countDocuments({});
    if (count === 0)
      return responseHandler(res, 200, "There's no user(s) in the database");
    return responseHandler(res, 200, 'Array of existing users', users);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return next(
        new CustomError(404, "There's no user with the specified ID")
      );
    return responseHandler(res, 200, 'user successfully deleted', user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthUser,
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  uploaduserImage,
};
