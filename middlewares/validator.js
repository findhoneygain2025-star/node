const { body } = require("express-validator");

let validator = [
    
  body("name")
    .notEmpty()
    .withMessage("user name should no be empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("name should be 3 to 15 char long")
    ,
    body("email")
    .notEmpty()
    .withMessage("email should not be empty")
    .isEmail()
    .withMessage("email should be a valid email")
   ,
    body("password")
    .notEmpty()
    .withMessage("password should not be empty")
    .isLength({min:6})
    .withMessage("password should be greater than 6char")
    .isStrongPassword()
    .withMessage("password should be strong password")
   
]

module.exports = validator