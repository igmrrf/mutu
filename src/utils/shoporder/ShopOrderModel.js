const mongoose = require("mongoose");
require("mongoose-type-email");
const uniqueValidator = require("mongoose-unique-validator");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const shoporderSchema = mongoose.Schema(
  {
    orderId: { type: Number, required: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    contactPhone: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 11,
      required: true,
      unique: true,
    },
    contactEmail: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
      minlength: [8, "Email is too short"],
      maxlength: [100, "Email provided is too lengthy"],
    },
    pay_type: { type: String },
    transfer_from_bank: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    transfer_from_account_name: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: true,
    },
    txn_amount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    name_teller: { type: String },
    teller_id: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
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
    card_bank: { type: String },
    action_taken: { type: String },
    trans_date: { type: Date },
    reply_date: { type: Date },
    received_date: { type: Date },
    receipt_id: { type: String },
    auth_id: { type: String },
    expiry_date: { type: Date },
    company: { type: String },
    remarks: { type: String },
    terminal_id: { type: String },
    terminal_location: { type: String },
    comments: { type: String },
    image: { type: String },
    products: [],
    receipt: {},
    totalAmount: { type: Number },
    delivery: {
      status: { type: Boolean },
      supervisor: { type: String },
      site: { type: String },
      deliveryTime: { type: Date, default: Date.now },
    },
    site: { type: String },
    paymentMethod: { type: String },
    image: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modifier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    autoindex: true,
  }
);

shoporderSchema.plugin(AutoIncrement, { inc_field: "id" });

shoporderSchema.index({
  stan: "text",
  rrn: "text",
  auth_id: "text",
  receipt_id: "text",
  terminal_location: "text",
  acquirer: "text",
  card_number: "text",
  action_taken: "text",
  trans_date: "text",
  company: "text",
});

shoporderSchema.plugin(uniqueValidator);

const ShopOrder = mongoose.model("Shoporder", shoporderSchema);

module.exports = ShopOrder;
