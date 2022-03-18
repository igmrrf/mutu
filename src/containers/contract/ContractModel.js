const mongoose = require('mongoose'); // Erase if already required

const contractSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['new', 'running', 'expired', 'cancelled'],
    default: 'new',
  },
  salary_structure_type: {
    type: String,
    enum: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
    require: true,
  },
  wage: {
    type: Number,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  first_contract_date: {
    type: Date,
    required: true,
  },
});

const Contract = mongoose.model('Contract', contractSchema);
module.exports = Contract;
