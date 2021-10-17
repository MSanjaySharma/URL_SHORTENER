const { check } = require("express-validator");

const urlsValidator = {};

urlsValidator.URLCreate = [
  //TITLE
  check("title").not().isEmpty().withMessage("Title is required"),
  check("title")
    .isLength({ max: 256 })
    .withMessage("URL should be within 256 characters"),
  //URL
  check("url").not().isEmpty().withMessage("URL is required"),
  check("url").isURL().withMessage("Enter a valid URL"),
  check("url")
    .isLength({ max: 2048 })
    .withMessage("URL should be within 2048 characters"),
];

module.exports = urlsValidator;
