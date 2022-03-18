// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const config = require("config");

// const secret = config.get("jwt_secret");

// const hashPassword = (password) => {
//   const salt = bcrypt.genSaltSync();
//   return bcrypt.hashSync(password, salt);
// };

// const comparePassword = (password, hashedPassword) => {
//   return bcrypt.compareSync(password, hashedPassword);
// };

// const generateToken = (payload, expiresIn) => {
//   return jwt.sign(payload, secret, { expiresIn });
// };

// const verifyToken = (token) => {
//   return jwt.verify(token, secret);
// };

// module.exports = {
//   hashPassword,
//   comparePassword,
//   generateToken,
//   verifyToken,
// };


import jwt from "jsonwebtoken";
import config from "config";

class Token {
  /**
   * Generates a token for a user
   * @param {String} userId - The ID of the user
   * @returns {String} - The generated token
   */
  static generate(payload, options) {
    const { userId, ...data } = payload;
    const jwtIssuer = config.get("app.jwtIssuer");
    const jwtAudience = config.get("app.jwtAudience");
    const jwtSecret = config.get("app.jwtSecret");

    const token = jwt.sign(
      {
        iss: jwtIssuer,
        aud: jwtAudience,
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 120, // Expires in 120 days
        ...data,
      },
      jwtSecret,
      options
    );

    return token;
  }

  /**
   * Decodes a JWT and returns it's payload
   * @param {String} token - JWT string to decode
   * @returns {Promise<Object>} A promise that resolves to the JWT payload
   */
  static decodeJWT(token) {
    const jwtSecret = config.get("app.jwtSecret");
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      });
    });
  }

  /**
   * Checks if an error is as a result of an invalid JWT
   * @param {Error} error - An error object
   * @returns {Boolean} true if the error is a JWT Error, false otherwise
   */
  static isJWTError(error) {
    const jwtErrors = ["TokenExpiredError", "JsonWebTokenError", "NotBeforeError"];
    return jwtErrors.includes(error.name);
  }
}

export default Token;

