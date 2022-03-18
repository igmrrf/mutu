const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const uniqueValidator = require("mongoose-unique-validator");

const reportSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    driver: {},
    pay_type: { type: String },
    transfer_from_bank: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true,
      collation: { locale: 'en', strength: 3 },
    },
    transfer_from_account_name: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: true,
      collation: { locale: 'en', strength: 3 },
    },

    name_teller: { type: String },
    txn_amount: { type: Number, required: true },
    amt_teller: { type: Number },
    date_teller: { type: Date },

    log_code: { type: String },
    acquirer: { type: String },
    stan: { type: String },
    rrn: { type: String },
    trans_id: { type: String },
    tx_ref: { type: String },
    status: { type: String },
    bank: { type: String },
    card_number: { type: String },
    action_taken: { type: String },
    trans_date: { type: Date },
    reply_date: { type: Date },
    received_date: { type: Date },
    receipt_id: { type: String },
    auth_id: { type: String },
    expiry_date: { type: Date },
    company: { type: String },
    remarks: { type: String },
    card_bank: { type: String },
    terminal_id: { type: String },
    terminal_location: { type: String },
    comments: { type: String },
    image: { type: String },
    products: [
      {
        name: { type: String },
        qty: { type: Number },
        price: { type: Number },
      },
    ],

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    autoindex: true,
  }
);

reportSchema.plugin(AutoIncrement, { inc_field: 'rep_id' });

reportSchema.index({
  stan: 'text',
  rrn: 'text',
  auth_id: 'text',
  receipt_id: 'text',
  terminal_location: 'text',
  acquirer: 'text',
  card_number: 'text',
  action_taken: 'text',
  trans_date: 'text',
  company: 'text',
});

reportSchema.plugin(uniqueValidator);
const Report = mongoose.model('Report', reportSchema);


module.exports = Report;
