"use strict";

var joi = require("joi");

var _require = require("mongoose"),
    model = _require.model,
    Schema = _require.Schema;

var debug = require("debug")("app:customerRoute");

var customerSchema = new Schema({
  isGold: {
    type: Boolean,
    "default": false
  },
  name: {
    type: String,
    required: true,
    "default": function _default(value) {
      return value && value.length > 0;
    },
    minlength: 3,
    maxlength: 40
  },
  phone: {
    type: String,
    minlength: 7,
    maxlength: 20
  }
});

var validateCustomer = function validateCustomer(data) {
  debug("Validating");
  var schema = joi.object({
    name: joi.string().min(5).max(50).required(),
    isGold: joi["boolean"]().required(),
    phone: joi.string()
  });
  return schema.validate(data);
};

var Customer = model("Customer", customerSchema);
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;