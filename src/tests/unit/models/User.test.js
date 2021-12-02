"use strict";

var _require = require("../../../models/User"),
    User = _require.User;

var jwt = require("jsonwebtoken");

var config = require("config");

var mongoose = require("mongoose");

describe("Testing the User model", function () {
  it("returns an encripted token", function () {
    var payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    var user = new User(payload);
    var token = user.generateAuthToken();
    var decoded = jwt.verify(token, config.get("vividly_jwtkey"));
    expect(decoded).toMatchObject(payload);
  });
});