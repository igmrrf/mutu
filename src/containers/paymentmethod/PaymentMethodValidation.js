const { body, param } = require('express-validator');

const PaymentMethodValidation = () => {
  return [body('name').isString().notEmpty()];
};

module.exports = PaymentMethodValidation;
