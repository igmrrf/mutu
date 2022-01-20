const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const inventorySchema = mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'Stockitem' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: {
      type: String,
      required: true,
      minlength: [20, 'Description is too short'],
      minlength: [1024, 'Description too lengthy'],
    },
    ops: { type: String },
    qty: { type: Number, required: true },
    unit: { type: String },
    remarks: { type: String },
    machine: { type: String },
    rollsUnit: { type: String },
    rollsQty: { type: Number },
    category: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    store: { type: String },
    barcode: { type: String },
    dateReceived: { type: Date },
  },
  {
    timestamps: true,
  }
);

inventorySchema.plugin(AutoIncrement, { inc_field: 'stock_id' });
inventorySchema.set('autoIndex', process.env.Node_Env != 'production');
// inventorySchema.plugin( uniqueValidator );
const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
