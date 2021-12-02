"use strict";

var jwt = require("jsonwebtoken");

var config = require("config");

function auth(req, res, next) {
  var token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied. No token provided");

  try {
    var decoded = jwt.verify(token, config.get("vividly_jwtkey"));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid Token");
  }
}

module.exports = auth;