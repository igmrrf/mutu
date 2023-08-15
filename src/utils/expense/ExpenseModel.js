const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const expenseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
      trim: true,
      collation: { locale: "en", strength: 3 },
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modifier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: {
      type: String,
      required: true,
      minlength: [20, "Description is too short"],
      minlength: [1024, "Description too lengthy"],
    },
    unit: { type: String },
    category: { type: String },
    barcode: { type: String },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);

expenseSchema.plugin(AutoIncrement, { inc_field: "expitem_id" });

expenseSchema.plugin(uniqueValidator);
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
