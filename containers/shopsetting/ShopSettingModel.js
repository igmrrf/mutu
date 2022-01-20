const mongoose = require('mongoose');
require('mongoose-type-email');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const shopsettingSchema = mongoose.Schema(
  {
    printurl: { type: String },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
      minlength: [8, 'Email is too short'],
      maxlength: [100, 'Email provided is too lengthy'],
    },
    phone: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 11,
      required: true,
      unique: true,
    },
    site: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    autoindex: true,
  }
);

shopsettingSchema.plugin(uniqueValidator);

const ShopSetting = mongoose.model('Shopsetting', shopsettingSchema);
module.exports = ShopSetting;
