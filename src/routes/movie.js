"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require("express");

var _require = require("../models/Genre"),
    Genre = _require.Genre;

var Auth = require("../middleware/auth");

var debug = require("debug")("app:route:movie");

var router = express.Router();

var _require2 = require("../models/Movie"),
    Movie = _require2.Movie,
    validate = _require2.validate;

router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var movies;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Movie.find().sort("name");

          case 2:
            movies = _context.sent;
            res.send(movies);

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
    var movie;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Movie.findById(req.params.id);

          case 2:
            movie = _context2.sent;

            if (movie) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(404).send({
              success: false,
              message: "movie could not be found"
            }));

          case 5:
            res.status(200).send(movie);

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
    var _validate, error, genre, movie;

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
            _context3.next = 6;
            return Genre.findById(req.body.genreId);

          case 6:
            genre = _context3.sent;

            if (genre) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(400).send("Invalid genre Id"));

          case 9:
            movie = new Movie({
              title: req.body.title,
              genre: {
                _id: genre._id,
                name: genre.name
              },
              numberInStock: req.body.numberInStock,
              dailyRentalRate: req.body.dailyRentalRate
            });
            _context3.next = 12;
            return movie.save();

          case 12:
            res.send(movie);

          case 13:
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
    var _validate2, error, movie;

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
            return Movie.findByIdAndUpdate(req.params.id);

          case 6:
            movie = _context4.sent;

            if (movie) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(404).send({
              success: false,
              message: "movie could not be found"
            }));

          case 9:
            res.send(movie);
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
    var movie;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Movie.findByIdAndRemove(req.params.id);

          case 2:
            movie = _context5.sent;

            if (movie) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", res.status(404).send({
              success: false,
              message: "movie could not be found"
            }));

          case 5:
            res.status(200).send(movie);

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