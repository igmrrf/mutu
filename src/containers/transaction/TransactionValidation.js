const { body } = require('express-validator');

const createTransactionValidation = [
  body('author')
    .notEmpty()
    .withMessage('An Author is required')
    .isMongoId()
    .withMessage('Invalid Id provided for author'),
  body('amount')
    .notEmpty()
    .withMessage(`'amount' is required`)
    .isNumeric()
    .withMessage(`'amount' should be of type number`),
  body('type')
    .notEmpty()
    .withMessage(`'type' of transaction is required`)
    .isString()
    .withMessage(`'type' should be a string`),
  body('date')
    .notEmpty()
    .withMessage(`'date' is required`)
    .isDate()
    .withMessage(`'date' should be a valid date and not in the past`),
  body('status')
    .notEmpty()
    .withMessage(`'status' of transaction is required`)
    .isString()
    .withMessage(`'status' should be a string`),
  body('tax_rate')
    .notEmpty()
    .withMessage(`'tax_rate' is required`)
    .isNumeric()
    .withMessage(`'tax_rate' should be of type number`),
  body('amount_after_tax')
    .notEmpty()
    .withMessage(`'amount_after_tax' is required`)
    .isNumeric()
    .withMessage(`'amount_after_tax' should be of type number`),
  body('description')
    .notEmpty()
    .withMessage(`'description' of transaction is required`)
    .isString()
    .withMessage(`'description' should be a string`),
];

module.exports = { createTransactionValidation };
