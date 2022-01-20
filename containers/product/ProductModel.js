const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    modifier: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
      minlength: [20, 'Description is too short'],
      minlength: [1024, 'Description too lengthy'],
    },
    price: { type: Number, required: true },
    costprice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    barcode: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    weight: {
      type: String,
      validate: (v) => `${v}Kg`,
    },
    taxRate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(uniqueValidator);
const Product = model('Product', productSchema);
Product.syncIndexes();

module.exports = Product;
