const uniqueValidator = require("mongoose-unique-validator");
const { SchemaTypes, Schema, model } = require("mongoose");
require("mongoose-type-email");

export const branchSchema = Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: true,
      unique: true,
      collation: { locale: "en", strength: 3 },
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipcode: String,
    },
    phone: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 11,
      required: true,
      unique: true,
    },
    email: {
      type: SchemaTypes.Email,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
      minlength: [8, "Email is too short"],
      maxlength: [100, "Email provided is too lengthy"],
    },
    icon: String,
    build_date: { type: Date, required: true },
    taxRate: Number,
  },
  {
    timestamps: true,
  }
);

branchSchema.plugin(uniqueValidator);
const Branch = model("Branch", branchSchema);

module.exports = Branch;
