"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var bcrypt = require("bcrypt");

var config = require("config");

var joi = require("joi");

var jwt = require("jsonwebtoken");

var express = require("express");

var router = express.Router();

var _require = require("../models/User"),
    User = _require.User,
    validate = _require.validate;

router.post("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, _validate, error, user, validPassword, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _validate = validate(req.body), error = _validate.error;

            if (!error) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).send(error.details[0].message));

          case 4:
            _context.next = 6;
            return User.findOne({
              email: email
            });

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).send("Invalid email or password"));

          case 9:
            _context.next = 11;
            return bcrypt.compare(password, user.password);

          case 11:
            validPassword = _context.sent;

            if (validPassword) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(400).send("Invalid email or password"));

          case 14:
            token = user.generateAuthToken();
            res.send(token);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = router;