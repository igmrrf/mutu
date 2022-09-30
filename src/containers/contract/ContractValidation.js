const { body, param } = require("express-validator");

class ContractValidation {
  constructor({ model: { User } }) {
    this.User = User;
  }

  create() {
    return [
      body("value")
        .notEmpty()
        .custom((value, {}) => {
          return this.findOne({ value: value }).then((value) => {
            if (!value) return Promise.reject("Value doesn't below to a value within the organization");
            return true;
          });
        }),
      body("anotherValue")
        .notEmpty()
        .withMessage("Description Cannot be empty")
        .isLength({ min: 24, max: 1024 })
        .withMessage("The only allowed Number of Characters is 24-1024"),
    ];
  }

  update() {
    return [
      body("value")
        .notEmpty()
        .custom((value, {}) => {
          return this.findOne({ value: value }).then((value) => {
            if (!value) return Promise.reject("Value doesn't below to a value within the organization");
            return true;
          });
        }),
      body("anotherValue")
        .notEmpty()
        .withMessage("Description Cannot be empty")
        .isLength({ min: 24, max: 1024 })
        .withMessage("The only allowed Number of Characters is 24-1024"),
    ];
  }

  getAll() {
    return [];
  }

  get() {
    return [
      param("id")
        .notEmpty()
        .withMessage("An id is required")
        .isMongoId()
        .withMessage("A valid MongoDB ID is required"),
    ];
  }

  delete() {
    return [
      param("id")
        .notEmpty()
        .withMessage("An id is required")
        .isMongoId()
        .withMessage("A valid MongoDB ID is required"),
    ];
  }
}

export default ContractValidation;
