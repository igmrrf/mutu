"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require("express");

var Auth = require("../middleware/auth");

var Admin = require("../middleware/admin");

var ValidateObject = require("../middleware/validateObjectId");

var debug = require("debug")("app:route:genre");

var router = express.Router();

var _require = require("../models/Genre"),
    Genre = _require.Genre,
    validate = _require.validate;

router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var genre;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Genre.find().sort("name");

          case 2:
            genre = _context.sent;

            if (genre) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(404).send("Genre not found"));

          case 5:
            if (!(genre.length < 1)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.send("Genre Collection is empty"));

          case 7:
            res.send(genre);

          case 8:
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
router.get("/:id", ValidateObject, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var genre;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Genre.findById(req.params.id);

          case 2:
            genre = _context2.sent;

            if (genre) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(404).send({
              success: false,
              message: "Genre could not be found"
            }));

          case 5:
            res.status(200).send(genre);

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
router.post("/", Auth, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _validate, error, genre;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _validate = validate(req.body), error = _validate.error;

            if (!error) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              success: false,
              message: error.details[0].message
            }));

          case 3:
            debug("Validated");
            genre = new Genre({
              name: req.body.name
            });
            _context3.next = 7;
            return genre.save();

          case 7:
            res.send(genre);

          case 8:
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
router.put("/:id", [ValidateObject, Auth], /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _validate2, error, genre;

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
            return Genre.findByIdAndUpdate(req.params.id, {
              name: req.body.name
            });

          case 6:
            genre = _context4.sent;

            if (!genre) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.send(genre));

          case 9:
            return _context4.abrupt("return", res.status(404).send({
              success: false,
              message: "Genre could not be found"
            }));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](3);
            res.send({
              status: false,
              message: "There was an error"
            });

          case 15:
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
router["delete"]("/:id", [ValidateObject, Auth, Admin], /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var genre;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Genre.findByIdAndRemove(req.params.id);

          case 2:
            genre = _context5.sent;

            if (genre) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", res.status(404).send({
              success: false,
              message: "Genre could not be found"
            }));

          case 5:
            res.status(200).send(genre);

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