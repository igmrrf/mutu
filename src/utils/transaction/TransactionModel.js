const { Schema, model } = require("mongoose");
const config = require("config");

let ref;
if (process.env !== "production") ref = "User";

const transactionSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref,
    required: true,
    index: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tax_rate: {
    type: Number,
    required: true,
  },
  amount_after_tax: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
