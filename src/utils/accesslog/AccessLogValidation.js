const { body, check, query, param } = require("express-validator");

class AccessLogValidation {
  constructor({ model: { User } }) {
    this.User = User;
  }

  create() {
    return [
      body("email")
        .isEmail()
        .notEmpty()
        .custom((value, {}) => {
          return this.findOne({ email: value }).then((user) => {
            if (!user) return Promise.reject("Email doesn't below to a user within the organization");
            return true;
          });
        }),
      body("description")
        .notEmpty()
        .withMessage("Description Cannot be empty")
        .isLength({ min: 24, max: 1024 })
        .withMessage("The only allowed Number of Characters is 24-1024"),
    ];
  }

  update() {
    return [
      body("email")
        .isEmail()
        .notEmpty()
        .custom((value, {}) => {
          return this.findOne({ email: value }).then((user) => {
            if (!user) return Promise.reject("Email doesn't below to a user within the organization");
            return true;
          });
        }),
      body("description")
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

export default AccessLogValidation;
