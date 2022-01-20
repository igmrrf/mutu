const { Schema, model } = require('mongoose');

const paymentSchema = Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentMethod',
    required: true,
  },
  tellerId: {
    type: String,
    required: true,
    unique: true,
  },
  method: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentMethod',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  taxAmount: Number,
  amountAfterTax: Number,
  amountPaid: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Payment = model('Payment', paymentSchema);

module.exports = Payment;
