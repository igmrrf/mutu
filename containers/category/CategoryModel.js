const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true,
      unique: true,
      collation: { locale: 'en', strength: 3 },
    },
    description: {
      type: String,
      required: true,
      minlength: [20, 'Description is too short'],
      minlength: [1024, 'Description too lengthy'],
    },
    barcode: { type: String },
    icon: { type: String },
  },
  {
    timestamps: true,
    strict: true,
  }
);

categorySchema.plugin(uniqueValidator);
const Category = model('Category', categorySchema);

module.exports = Category;
