const uniqueValidator = require("mongoose-unique-validator");
const { Schema, model, SchemaTypes } = require("mongoose");
require("mongoose-type-email");

const auditSchema = Schema(
  {
    email: {
      type: SchemaTypes.Email,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
      minlength: [8, "Email is too short"],
      maxlength: [100, "Email provided is too lengthy"],
    },
    description: {
      type: String,
      required: true,
      minlength: [20, "Description is too short"],
      maxlength: [1024, "Description too lengthy"],
    },
  },
  {
    timestamps: true,
  }
);

auditSchema.plugin(uniqueValidator);
const Auditlog = model("Auditlog", auditSchema);

module.exports = Auditlog;
