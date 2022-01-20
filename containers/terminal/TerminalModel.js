const mongoose = require('mongoose');
uniqueValidator = require('mongoose-unique-validator');

const terminalSchema = mongoose.Schema(
  {
    terminal_id: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bank: {
      type: String,
    },
    terminal_location: {
      type: String,
    },
    company: {
      type: String,
    },
    sn: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

terminalSchema.plugin(uniqueValidator);
const Terminal = mongoose.model('Terminal', terminalSchema);

module.exports = Terminal;
