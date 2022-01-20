const mongoose = require('mongoose');
uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const expenseReportSchema = mongoose.Schema(
  {
    products: [
      {
        name: {
          type: String,
          minlength: 5,
          maxlength: 100,
          required: true,
          collation: { locale: 'en', strength: 3 },
        },
        description: {
          type: String,
          required: true,
          minlength: [20, 'Description is too short'],
          minlength: [1024, 'Description too lengthy'],
        },
        category: { type: String },
        qty: { type: Number },
        unit: { type: String },
        price: { type: Number },
        amount: { type: Number },
      },
    ],
    notes: [
      {
        text: { type: String },
        author: { type: String },
        date: { type: Date },
        image: { type: String },
      },
    ],
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    site: { type: String },
    status: { type: String },
    approvalComment: { type: String },
    category: { type: String },
    log: [{}],
    payment: {},
    payHistory: [
      {
        bankAcct: { type: String },
        paymentDate: { type: Date },
        memo: { type: String },
        paidAmount: { type: Number },
        date: { type: Date, default: Date.now },
        payer: { type: String },
      },
    ],
    date: { type: Date },
    type: { type: String },
    txn_amount: { type: Number },
    balance: { type: Number, default: 0 },
    remarks: { type: String },
  },
  {
    timestamps: true,
    strict: true,
  }
);

expenseReportSchema.plugin(AutoIncrement, { inc_field: 'expense_id' });

expenseReportSchema.set('autoIndex', process.env.Node_Env != 'production');
expenseReportSchema.plugin(uniqueValidator);

const ExpenseReport = mongoose.model('ExpenseReport', expenseReportSchema);

module.exports = ExpenseReport;
