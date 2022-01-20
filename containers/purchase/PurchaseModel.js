const mongoose = require('mongoose');

var purchaseSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    venderReference: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    recieved: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Ordered', 'Pending', 'Tracking', 'Received', 'Completed'],
      default: 'Pending',
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;
