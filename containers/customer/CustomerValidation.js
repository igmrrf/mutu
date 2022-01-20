const { body, check, query, param } = require('express-validator');
const Customer = require('./CustomerModel');

const CreateValidation = [
  body('name').isString().not().isEmpty(),
  body('email')
    .isEmail()
    .notEmpty()
    .custom((value, {}) => {
      return Customer.findOne({ email: value }).then((customer) => {
        if (customer)
          return Promise.reject(
            'Email address already exist for another customer'
          );
        return true;
      });
    }),
  check('password')
    .exists()
    .trim()
    .isLength({ min: 8, max: 24 })
    .withMessage('Your password must contain a minimum of 8 characters')
    // .matches(/[!@#$%^&*(),.?":{}|<>]/g)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage(
      'Password should not be empty, minimum eight characters, at least one letter, one number and one special character'
    ),
  body('mobile')
    .isMobilePhone('en-NG')
    .withMessage('Please enter a valid phone number')
    .isLength({ min: 10, max: 13 }),
  check('image')
    .if(body('image').exists())
    .notEmpty()
    .isString()
    .isLength({ min: 10, max: 1024 }),
  body('branch')
    .isMongoId()
    .withMessage('Please provide a valid ID')
    .notEmpty()
    .withMessage('Branch Cannot be empty')
    .isLength({ min: 24, max: 24 })
    .withMessage('The only allowed Number of Characters is 24'),
];

const LoginInValidation = [
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('password').isAlphanumeric().notEmpty().isLength({ min: 8, max: 24 }),
];

const UpdateValidation = [];
const UpdateBranchValidation = [];

module.exports = { CreateValidation, LoginInValidation };
