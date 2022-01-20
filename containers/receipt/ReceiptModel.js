const mongoose = require('mongoose');
require('mongoose-type-email');
uniqueValidator = require('mongoose-unique-validator');

const receiptSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  header: {
    company: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    phone: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 11,
      required: true,
      unique: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
      minlength: [8, 'Email is too short'],
      maxlength: [100, 'Email provided is too lengthy'],
    },
    site: String,
    customerName: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: true,
      collation: { locale: 'en', strength: 3 },
    },
    userId: String,
    orderRef: String,
    tellerId: String,
    bankName: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true,
      collation: { locale: 'en', strength: 3 },
    },
    receiptRef: String,
    createDate: String,
  },
  mid: {
    cartItems: [{}],
    amount: Number,
    amountPaid: Number,
    taxAmount: Number,
    amountAfterTax: Number,
    status: String,
  },
  footer: String,

  reprint: Number,
});

receiptSchema.index({
  stan: 'text',
  terminal_location: 'text',
  acquirer: 'text',
  card_number: 'text',
  action_taken: 'text',
  customer: 'text',
});

receiptSchema.plugin(uniqueValidator);
const Receipt = mongoose.model('Receipt', receiptSchema);
Receipt.createIndexes();
module.exports = Receipt;
