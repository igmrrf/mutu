const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const secret = config.get('jwt_secret');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
