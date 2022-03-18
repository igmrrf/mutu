const {body} = require('express-validator')

const createSubscriberValidation =[
  body('email').notEmpty().withMessage()
]