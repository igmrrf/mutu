const { Schema, model } = require('mongoose');

const planSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Plan = model('Plan', planSchema);

module.exports = Plan;
