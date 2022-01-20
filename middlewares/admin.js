const CustomError = require('../utils/responses/errorResponse');

const Admin = (req, res, next) => {
  const { roles } = req.user;

  if (!roles.includes('sudo')) {
    return next(
      new CustomError(401, 'Access Denied. Not Authorized to access this route')
    );
  }
  return next();
};

module.exports = Admin;
