const { body } = require('express-validator');

const createTerminalValidation = [
  body('terminal_id')
    .notEmpty()
    .withMessage(`'terminal_id' is required`)
    .isString()
    .withMessage(`'terminal_id' should be a string`),
  body('bank')
    .notEmpty()
    .withMessage(`'bank' is required`)
    .isString()
    .withMessage(`'bank' should be a string`),
  body('terminal_location')
    .notEmpty()
    .withMessage(`'terminal_location' is required`)
    .isString()
    .withMessage(`'terminal_location' should be a string`),
  body('company')
    .notEmpty()
    .withMessage(`'company' is required`)
    .isString()
    .withMessage(`'company' should be a string`),
  body('sn')
    .notEmpty()
    .withMessage(`'sn' is required`)
    .isString()
    .withMessage(`'sn' should be a string`),
];

module.exports = { createTerminalValidation };
