const { Schema, model } = require('mongoose');

const paymethodSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentMethod = model('Paymethod', paymethodSchema);

module.exports = PaymentMethod;
