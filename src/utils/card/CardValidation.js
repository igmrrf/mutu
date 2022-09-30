const { body } = require('express-validator');
const { cardTypes } = require('./CardModel');

const createCardValidation = [
  body('customer')
    .notEmpty()
    .withMessage('Customer Id is required')
    .isMongoId()
    .withMessage('Provide a valid Id'),
  body('type')
    .notEmpty()
    .withMessage('Type of card must not be empty')
    .isString()
    .withMessage('Type must be a string')
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage(
      'Type can only have a minimum of 3 characters and maximum of 15'
    )
    .custom((value) => {
      const valid = cardTypes.filter((type) => type === value);
      if (valid.length !== 1) return false;
    })
    .withMessage('Card type not allowed'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Name length limit (min of 5 and max of 100) characters'),
  body('bank')
    .notEmpty()
    .withMessage('Bank is required')
    .isString()
    .withMessage('Bank must be a string')
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage('Bank length limit (min of 3 and max of 15) characters'),
  body('cvc')
    .notEmpty()
    .withMessage('CVC is required')
    .isNumeric()
    .withMessage('cvc must be a NUMBER')
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage('CVC is only limited to 3 characters'),
  body('number')
    .notEmpty()
    .withMessage('number is required')
    .isNumeric()
    .withMessage('number must be a NUMBER')
    .trim()
    .isLength({ min: 10, max: 24 })
    .withMessage('number is limited to min 10 and max 24 characters'),
  body('expiring_date')
    .notEmpty()
    .withMessage('expiring date is required')
    .isDate()
    .withMessage('expiring date is must be a date & not in the past'),
];

module.exports = { createCardValidation };
