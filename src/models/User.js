"use strict";

var mongoose = require("mongoose");

var debug = require("debug")("app:model:genre");

var joi = require("joi");

var config = require("config");

var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    "default": "",
    min: 5,
    max: 50,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    "default": "",
    min: 5,
    max: 100,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    "default": "",
    min: 5,
    max: 1024,
    required: true
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({
    _id: this._id,
    isAdmin: this.isAdmin
  }, config.get("vividly_jwtkey"));
};

var User = mongoose.model("User", userSchema);

var validateUser = function validateUser(user) {
  var schema = joi.object({
    name: joi.string().min(5).max(60).required(),
    email: joi.string().min(5).max(100).required().email(),
    password: joi.string().min(5).max(255).required()
  });
  return schema.validate(user);
};

module.exports = {
  User: User,
  validate: validateUser
};