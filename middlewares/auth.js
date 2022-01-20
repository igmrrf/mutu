const { verifyToken } = require('../utils/auth.utils');
const CustomError = require('../utils/responses/errorResponse');
const User = require('../containers/user/UserModel');

const Auth = async (req, res, next) => {
  try {
    const token = req.headers['auth-token'];
    if (!token) {
      return next(
        new CustomError(401, 'Access Denied. No Access Code Provided')
      );
    }
    const decodedToken = await verifyToken(token);
    const user = await User.findById(decodedToken._id);

    if (!user) {
      return next(
        new CustomError(401, 'Access Denied, Security Breach Attempted')
      );
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Auth;
