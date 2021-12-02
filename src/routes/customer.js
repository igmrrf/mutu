"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require("express");

var Auth = require("../middleware/auth");

var debug = require("debug")("app:route");

var router = express.Router();

var _require = require("../models/Customers"),
    Customer = _require.Customer,
    validate = _require.validate;

router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var customers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Customer.find().sort("name");

          case 2:
            customers = _context.sent;
            res.send(customers);

          case 4:
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
router.get("/:id", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var customer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Customer.findById(req.params.id);

          case 2:
            customer = _context2.sent;

            if (customer) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(404).send({
              success: false,
              message: "customer could not be found"
            }));

          case 5:
            res.status(200).send(customer);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, phone, isGold, name, _validate, error, customer;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, phone = _req$body.phone, isGold = _req$body.isGold, name = _req$body.name;
            _validate = validate(req.body), error = _validate.error;

            if (!error) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              success: false,
              message: error.details[0].message
            }));

          case 4:
            debug("Validated");
            customer = new Customer({
              name: name,
              phone: phone,
              isGold: isGold
            });
            _context3.next = 8;
            return customer.save();

          case 8:
            res.send(customer);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put("/:id", Auth, /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _validate2, error, customer;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _validate2 = validate(req.body), error = _validate2.error;

            if (!error) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              success: false,
              message: error.details[0].message
            }));

          case 3:
            _context4.prev = 3;
            _context4.next = 6;
            return Customer.findByIdAndUpdate(req.params.id);

          case 6:
            customer = _context4.sent;

            if (customer) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(404).send({
              success: false,
              message: "customer could not be found"
            }));

          case 9:
            res.send(customer);
            _context4.next = 17;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](3);
            debug(_context4.t0);
            res.send({
              status: false,
              message: "There was an error"
            });
            return _context4.abrupt("return");

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 12]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]("/:id", Auth, /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var customer;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Customer.findByIdAndRemove(req.params.id);

          case 2:
            customer = _context5.sent;

            if (customer) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", res.status(404).send({
              success: false,
              message: "customer could not be found"
            }));

          case 5:
            res.status(200).send(customer);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;