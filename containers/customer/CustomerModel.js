const mongoose = require('mongoose');
require('mongoose-type-email');
uniqueValidator = require('mongoose-unique-validator');

const customerSchema = mongoose.Schema(
  {
    name: { type: String, lowercase: false, trim: true, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    phone: {
      type: Number,
      required: true,
    },
    drivers: [
      {
        name: {
          type: String,
          minlength: 5,
          maxlength: 100,
          required: true,
          unique: true,
          collation: { locale: 'en', strength: 3 },
        },
        phone: {
          type: String,
          trim: true,
          minlength: 10,
          maxlength: 11,
          required: true,
          unique: true,
        },
      },
    ],
    password: {
      type: String,
      minlength: 50,
      maxlength: 1024,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
      minlength: [8, 'Email is too short'],
      maxlength: [100, 'Email provided is too lengthy'],
    },
    icon: { type: String },
    barcode: { type: String },
    biometric: { type: String },
    phones: [],
    emails: [
      {
        type: mongoose.SchemaTypes.Email,
        required: true,
        trim: true,
        lowercase: true,
        required: true,
        minlength: [8, 'Email is too short'],
        maxlength: [100, 'Email provided is too lengthy'],
      },
    ],
    cards: [
      {
        name: { type: String },
        number: { type: String },
        type: { type: String },
        bank: { type: String },
      },
    ],
    address: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

customerSchema.set('autoIndex', process.env.Node_Env != 'production');
customerSchema.plugin(uniqueValidator);
// customerSchema.plugin(require('mongoose-beautiful-unique-validation'));
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
