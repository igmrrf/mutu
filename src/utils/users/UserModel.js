const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema(
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
    roles: [
      {
        type: String,
      },
    ],
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
    title: String,
    bank_account: {
      bank: {
        type: String,
        trim: true,
      },
      name: String,
      number: Number,
      icon: String,
    },
    password: {
      type: String,
      minlength: 50,
      maxlength: 1024,
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    image: {
      type: String,
      unique: true,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'Contract',
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, {
  message: '{PATH} is expected to be unique',
});

const User = model('User', userSchema);
module.exports = User;
