const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const projectSchema = Schema(
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
    taxRate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.plugin(uniqueValidator);
const Project = model('Project', projectSchema);
Project.syncIndexes();

module.exports = Project;
