const mongoose = require('mongoose');
require('mongoose-type-email');
uniqueValidator = require('mongoose-unique-validator');

const noteSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopOrder' },
    body: { type: String },
    subject: { type: String },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
      minlength: [8, 'Email is too short'],
      maxlength: [100, 'Email provided is too lengthy'],
    },
    accepted: [],
    rejected: [],
    envelope: {},
    envelopeTime: { type: Number },
    messageTime: { type: Number },
    messageSize: { type: String },
  },
  {
    timestamps: true,
    strict: true,
  }
);

noteSchema.plugin(uniqueValidator);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
