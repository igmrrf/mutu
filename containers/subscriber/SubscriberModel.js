const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var subscriberSchema = new Schema(
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
  },
  { timestamps: true }
);

subscriberSchema.plugin(uniqueValidator, {
  message: '{PATH} is expected to be unique',
});

const Subscriber = model('Subscriber', subscriberSchema);
module.exports = Subscriber;
