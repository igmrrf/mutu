const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const subAccountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      minlength: 10,
      maxlength: 50,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    mobile: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 11,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 50,
      maxlength: 1024,
      required: true,
    },
    image: {
      type: String,
      unique: true,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  { timestamps: true }
);

subAccountSchema.plugin(uniqueValidator, {
  message: "{PATH} is expected to be unique",
});

const SubAccount = model("SubAccount", subAccountSchema);
module.exports = SubAccount;
