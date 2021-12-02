"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var request = require('supertest');

var _require = require('../../models/Genre'),
    Genre = _require.Genre;

var _require2 = require('../../models/User'),
    User = _require2.User;

var mongoose = require('mongoose');

var server;
describe('/api/genres', function () {
  beforeEach(function () {
    server = require('../../src');
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
  describe('GET/', function () {
    it('should return all genres', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Genre.collection.insertMany([{
                name: 'genre1'
              }, {
                name: 'genre2'
              }]);

            case 2:
              _context2.next = 4;
              return request(server).get('/api/genres');

            case 4:
              res = _context2.sent;
              expect(res.status).toBe(200);
              expect(res.body.length).toBe(2);
              expect(res.body.some(function (g) {
                return g.name === 'genre1';
              })).toBeTruthy();

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('GET/:id', function () {
    it('should return genre with the id if valid ID', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var genre, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              genre = new Genre({
                name: 'genre1'
              });
              _context3.next = 3;
              return genre.save();

            case 3:
              _context3.next = 5;
              return request(server).get("/api/genres/".concat(genre._id));

            case 5:
              res = _context3.sent;
              expect(res.status).toBe(200);
              expect(res.body).toHaveProperty("name", genre.name);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should return status 404 with if invalid ID', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return request(server).get("/api/genres/1");

            case 2:
              res = _context4.sent;
              expect(res.status).toBe(404);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should return status 404 with if genre isn"t found', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var id, res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = mongoose.Types.ObjectId();
              _context5.next = 3;
              return request(server).get("/api/genres/id");

            case 3:
              res = _context5.sent;
              expect(res.status).toBe(404);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe("POSTS", function () {
    // Define the happy path, and in each test, we change
    // one parameter that clearly aligns with the name of the test
    var token;
    var name;
    beforeEach(function () {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    var exec = /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", request(server).post('/api/genres').set('x-auth-token', token).send({
                  name: name
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function exec() {
        return _ref6.apply(this, arguments);
      };
    }();

    it("should return 401 if c lient isn't logged in", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              token = '';
              _context7.next = 3;
              return exec();

            case 3:
              res = _context7.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it("should return 400 if genre is less than 5 characters", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              name = "1234";
              _context8.next = 3;
              return exec();

            case 3:
              res = _context8.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it("should return 400 if genre is more than 50 characters", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              name = new Array(72).join("a");
              _context9.next = 3;
              return exec();

            case 3:
              res = _context9.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it("should save genre if valid", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var genre;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return exec();

            case 2:
              _context10.next = 4;
              return Genre.find({
                name: name
              });

            case 4:
              genre = _context10.sent;
              expect(genre).not.toBeNull();

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it("should return saved genre", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var result;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return exec();

            case 2:
              result = _context11.sent;
              expect(result.body).toHaveProperty("name");

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
  describe('PUT /:id', function () {
    var token;
    var newName;
    var genre;
    var id;

    var exec = /*#__PURE__*/function () {
      var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return request(server).put('/api/genres/' + id).set('x-auth-token', token).send({
                  name: newName
                });

              case 2:
                return _context12.abrupt("return", _context12.sent);

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      return function exec() {
        return _ref12.apply(this, arguments);
      };
    }();

    beforeEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              // Before each test we need to create a genre and
              // put it in the database.
              genre = new Genre({
                name: 'genre1'
              });
              _context13.next = 3;
              return genre.save();

            case 3:
              token = new User().generateAuthToken();
              id = genre._id;
              newName = 'updatedName';

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    it('should return 401 if client is not logged in', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var res;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              token = '';
              _context14.next = 3;
              return exec();

            case 3:
              res = _context14.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('should return 400 if genre is less than 5 characters', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var res;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              newName = '1234';
              _context15.next = 3;
              return exec();

            case 3:
              res = _context15.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it('should return 400 if genre is more than 50 characters', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var res;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              newName = new Array(52).join('a');
              _context16.next = 3;
              return exec();

            case 3:
              res = _context16.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it('should return 404 if id is invalid', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var res;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              id = 1;
              _context17.next = 3;
              return exec();

            case 3:
              res = _context17.sent;
              expect(res.status).toBe(404);

            case 5:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    it('should return 404 if genre with the given id was not found', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var res;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              id = mongoose.Types.ObjectId();
              _context18.next = 3;
              return exec();

            case 3:
              res = _context18.sent;
              expect(res.status).toBe(404);

            case 5:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
    it('should update the genre if input is valid', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var updatedGenre;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return exec();

            case 2:
              _context19.next = 4;
              return Genre.findById(genre._id);

            case 4:
              updatedGenre = _context19.sent;
              expect(updatedGenre.name).toBe(newName.toLowerCase());

            case 6:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    it('should return the updated genre if it is valid', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var res;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return exec();

            case 2:
              res = _context20.sent;
              expect(res.body).toHaveProperty('_id');
              expect(res.body).toHaveProperty('name', "genre1");

            case 5:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
  });
  describe('DELETE /:id', function () {
    var token;
    var genre;
    var id;

    var exec = /*#__PURE__*/function () {
      var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return request(server)["delete"]('/api/genres/' + id).set('x-auth-token', token).send();

              case 2:
                return _context21.abrupt("return", _context21.sent);

              case 3:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }));

      return function exec() {
        return _ref21.apply(this, arguments);
      };
    }();

    beforeEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              // Before each test we need to create a genre and
              // put it in the database.
              genre = new Genre({
                name: 'genre1'
              });
              _context22.next = 3;
              return genre.save();

            case 3:
              id = genre._id;
              token = new User({
                isAdmin: true
              }).generateAuthToken();

            case 5:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
    it('should return 401 if client is not logged in', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var res;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              token = '';
              _context23.next = 3;
              return exec();

            case 3:
              res = _context23.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    })));
    it('should return 403 if the user is not an admin', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      var res;
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              token = new User({
                isAdmin: false
              }).generateAuthToken();
              _context24.next = 3;
              return exec();

            case 3:
              res = _context24.sent;
              expect(res.status).toBe(403);

            case 5:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
    it('should return 404 if id is invalid', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      var res;
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              id = 1;
              _context25.next = 3;
              return exec();

            case 3:
              res = _context25.sent;
              expect(res.status).toBe(404);

            case 5:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    })));
    it('should return 404 if no genre with the given id was found', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      var res;
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              id = mongoose.Types.ObjectId();
              _context26.next = 3;
              return exec();

            case 3:
              res = _context26.sent;
              expect(res.status).toBe(404);

            case 5:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    })));
    it('should delete the genre if input is valid', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      var genreInDb;
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return exec();

            case 2:
              _context27.next = 4;
              return Genre.findById(id);

            case 4:
              genreInDb = _context27.sent;
              expect(genreInDb).toBeNull();

            case 6:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27);
    })));
    it('should return the removed genre', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      var res;
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return exec();

            case 2:
              res = _context28.sent;
              expect(res.body).toHaveProperty('_id', genre._id.toHexString());
              expect(res.body).toHaveProperty('name', genre.name);

            case 5:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28);
    })));
  });
});