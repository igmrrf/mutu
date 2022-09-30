const uniqueValidator = require("mongoose-unique-validator");
const { Schema, model } = require("mongoose");

const cardTypes = ["Credit", "Debit", "ATM", "Fleet", "Stored-value", "Charge"];
const cardSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    image: [{ type: String }],
    type: {
      type: String,
      enum: cardTypes,
      default: "",
    },
    name: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: true,
    },
    bank: {
      type: String,
      requied: true,
    },
    cvc: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    expiring_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

cardSchema.plugin(uniqueValidator);
const Card = model("Card", cardSchema);

module.exports = Card;
