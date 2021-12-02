"use strict";

var mongoose = require("mongoose");

var debug = require("debug")("app:model:genre");

var joi = require("joi");

var genreSchema = new mongoose.Schema({
  name: {
    type: String,
    "default": "",
    min: 5,
    max: 20,
    required: true,
    trim: true,
    lowercase: true
  }
});

var validateInput = function validateInput(data) {
  debug("Validating");
  var schema = joi.object({
    name: joi.string().min(5).max(50).required()
  });
  return schema.validate(data);
};

module.exports = {
  Genre: mongoose.model("Genre", genreSchema),
  validate: validateInput,
  genreSchema: genreSchema
};