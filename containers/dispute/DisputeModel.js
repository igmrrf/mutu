const beautifulValidate = require('mongoose-beautiful-unique-validation');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const disputeSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    txn_amount: { type: Number, required: true },
    trans_id: { type: String },
    log_code: { type: String },
    acquirer: { type: String, required: true },
    stan: { type: String, required: true },
    rrn: { type: String },
    status: { type: String },
    bank: { type: String },
    card_number: { type: String },
    action_taken: { type: String },
    terminal_location: { type: String },

    trans_date: { type: Date },
    trans_time: { type: String },

    reply_date: { type: Date },
    reply_time: { type: String },

    received_date: { type: Date },
    received_time: { type: String },

    avatar: { type: String },

    expiry_date: { type: Date },
    expiry_time: { type: String },
    auth_id: { type: String },
    receipt_id: { type: String },

    company: { type: String },
    remarks: { type: String },
    card_bank: { type: String },
    terminal_id: { type: String },
    comments: { type: String },
    bank_action: { type: String }, // CORRECT DEBIT or WRONG DEBIT
    bank_debit_date: { type: Date },
    image: { type: String },

    // createdAt: {type: Date, Default: Date.now},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    autoindex: true,
  }
);

disputeSchema.plugin(AutoIncrement, { inc_field: 'dispute_id' });

disputeSchema.index({
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

disputeSchema.plugin(uniqueValidator);
disputeSchema.plugin(beautifulValidate);

const Dispute = mongoose.model('dispute', disputeSchema);
Dispute.createIndexes();

module.exports = Dispute;
