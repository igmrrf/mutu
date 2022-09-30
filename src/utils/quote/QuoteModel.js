const mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    amountAfterTax: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      required: true,
    },
    closingDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
