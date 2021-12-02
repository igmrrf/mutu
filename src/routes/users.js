"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var jwt = require("jsonwebtoken");

var bcrypt = require("bcrypt");

var express = require("express");

var debug = require("debug")("app:route:user");

var router = express.Router();

var _ = require("lodash");

var _require = require("../models/User"),
    User = _require.User,
    validate = _require.validate;

router.post("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, email, password, _validate, error, user, salt;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            _validate = validate(req.body), error = _validate.error;

            if (!error) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              success: false,
              message: error.details[0].message
            }));

          case 4:
            debug("Validated");
            _context.next = 7;
            return User.findOne({
              email: email
            });

          case 7:
            user = _context.sent;

            if (!user) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).send("User already exists"));

          case 10:
            user = new User({
              name: name,
              email: email,
              password: password
            });
            debug("User Created");
            _context.next = 14;
            return bcrypt.genSalt(10);

          case 14:
            salt = _context.sent;
            _context.next = 17;
            return bcrypt.hash(user.password, salt);

          case 17:
            user.password = _context.sent;
            _context.next = 20;
            return user.save();

          case 20:
            user = _context.sent;
            debug("User Saved");
            token = user.generateAuthToken();
            res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));

          case 24:
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