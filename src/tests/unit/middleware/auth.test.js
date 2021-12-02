"use strict";

var auth = require('../../../middleware/auth');

var _require = require("../../../models/User"),
    User = _require.User;

var mongoose = require('mongoose');

describe("auth middleware", function () {
  it("should populate req.user with the payload of a valid JWT", function () {
    var payload = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    var token = new User(payload).generateAuthToken();
    var req = {
      header: jest.fn().mockReturnValue(token)
    };
    var res = {};
    var next = jest.fn();
    auth(req, res, next);
    expect(req.user).toBeDefined();
    expect(req.user).toHaveProperty('isAdmin', true);
  });
});