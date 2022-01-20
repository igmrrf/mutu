const { body } = require('express-validator');

const createBranchValidation = [
  body('name').notEmpty().isString().trim().isLength({ min: 5, max: 100 }),
  body('address.street')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 56 }),
  body('address.city')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 56 }),
  body('address.state')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 56 }),
  body('address.country')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 56 }),
  body('address.zipcode')
    .exists()
    .notEmpty()
    .isNumeric()
    .isLength({ min: 5, max: 6 }),
  body('phone')
    .notEmpty()
    .isNumeric()
    .isMobilePhone('en-NG')
    .isLength({ min: 10, max: 13 })
    .withMessage('Phone Digits should be up to 10 and not greater than 13'),
  body('email')
    .notEmpty()
    .isString()
    .isEmail()
    .normalizeEmail()
    .isLength({ min: 5, max: 100 }),
  body('build_date').notEmpty().isDate(),
];

module.exports = { createBranchValidation };
