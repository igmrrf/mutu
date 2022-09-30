const { body } = require('express-validator');

const createCategoryValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name should be a string')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Length limit (min:5 & max:100)'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description should be a string')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Length limit (min:5 & max:100)'),
  body('barcode')
    .notEmpty()
    .withMessage('barcode is required')
    .isString()
    .withMessage('barcode should be a string')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Length limit (min:5 & max:100)'),
  body('icon')
    .notEmpty()
    .withMessage('icon is required')
    .isString()
    .withMessage('icon should be a string')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Length limit (min:5 & max:100)'),
];

module.exports = { createCategoryValidation };
