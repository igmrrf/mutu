const { Schema, model } = require('mongoose');

const invoiceSchema = Schema(
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
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    action: {
      type: String,
      enum: ['Call', 'Follow-up on Payment', 'Await Response', 'Email'],
    },
    status: {
      type: String,
      enum: ['Posted', 'Processing', 'Awaiting confirmation'],
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Not Paid'],
    },
  },
  { timestamps: true }
);

const Invoice = model('Invoice', invoiceSchema);

module.exports = Invoice;
