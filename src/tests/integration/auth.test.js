"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var request = require('supertest');

var _require = require('../../models/Genre'),
    Genre = _require.Genre;

var _require2 = require('../../models/User'),
    User = _require2.User;

var server;
var token;
describe('auth', function () {
  beforeEach(function () {
    server = require('../../src');
    token = new User().generateAuthToken();
  });
  afterEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Genre.deleteOne();

          case 2:
            server.close();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

  var exec = function exec() {
    return request(server).post('/api/genres').set('x-auth-token', token).send({
      name: 'genre1'
    });
  };

  it("should return 401 if no token", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = "";
            _context2.next = 3;
            return exec();

          case 3:
            res = _context2.sent;
            expect(res.status).toBe(401);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("should return 400 if token is set to null", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = null;
            _context3.next = 3;
            return exec();

          case 3:
            res = _context3.sent;
            expect(res.status).toBe(400);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it("should return 400 if token is invalid", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            token = "kjdkalhkdjfhakdaj";
            _context4.next = 3;
            return exec();

          case 3:
            res = _context4.sent;
            expect(res.status).toBe(400);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it("should return 200 if token is valid", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return exec();

          case 2:
            res = _context5.sent;
            expect(res.status).toBe(200);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});