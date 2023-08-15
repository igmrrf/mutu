const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const eodSchema = mongoose.Schema(
  {
    terminal_id: { type: mongoose.Schema.Types.ObjectId, ref: "Terminal" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date },
    declineTotal: { type: Number },
    cardTotal: { type: Number },
  },
  {
    timestamps: true,
    strict: true,
  }
);

eodSchema.plugin(uniqueValidator);
const EOD = mongoose.model("EOD", eodSchema);

module.exports = EOD;
