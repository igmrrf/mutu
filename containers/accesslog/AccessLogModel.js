const uniqueValidator = require('mongoose-unique-validator');
const { Schema, model, SchemaTypes } = require('mongoose');
require('mongoose-type-email');

const accesslogSchema = Schema(
  {
    email: {
      type: SchemaTypes.Email,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

accesslogSchema.plugin(uniqueValidator);
const Accesslog = model('Accesslog', accesslogSchema);

module.exports = Accesslog;
