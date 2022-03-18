const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const stockItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
      trim: true,
      collation: { locale: 'en', strength: 3 },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    modifier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [20, 'Description is too short'],
      minlength: [1024, 'Description too lengthy'],
    },
    unit: { type: String },
    category: { type: String },
    barcode: { type: String },
    icon: { type: String },
    quantity: {
      type: Number,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

stockItemSchema.plugin(AutoIncrement, { inc_field: 'sku' });

stockItemSchema.plugin(uniqueValidator);
const StockItem = mongoose.model('StockItem', stockItemSchema);

module.exports = StockItem;
