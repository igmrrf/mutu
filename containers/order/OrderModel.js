const { Schema, model } = require('mongoose');
const { branchSchema } = require('../branch/BranchModel');
uniqueValidator = require('mongoose-unique-validator');

const orderSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    modifier: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    branch: {
      type: branchSchema,
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Suspended'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(uniqueValidator);
const Order = model('Order', orderSchema);

module.exports = Order;
