const mongoose = require('mongoose');
require('mongoose-type-email');
uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
      collation: { locale: 'en', strength: 3 },
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    phone: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 11,
      required: true,
      unique: true,
    },
    department: { type: String, required: true, trim: true },
    bank_account: {
      bank: {
        type: String,
        min: [2, "Bank provided isn't allowed"],
        max: [100, 'Bank Name is too lengthy'],
        required: true,
        trim: true,
      },
      acct_number: {
        type: String,
        min: [10, 'Minimum account number strings is 10'],
        max: [10, 'Maximum account number length is 10'],
      },
      icon: String,
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
    biometric: { type: String },
    phones: [
      {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 11,
        required: true,
        unique: true,
      },
    ],
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
    category: { type: String },
    branch: { type: String },
    jobname: { type: String },
    type: { type: String },
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

contactSchema.plugin(AutoIncrement, { inc_field: 'contact_id' });

contactSchema.set('autoIndex', process.env.Node_Env != 'production');
contactSchema.plugin(uniqueValidator);
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
