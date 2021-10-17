const express = require("express");
const router = express.Router();

const { runValidation } = require("./validators");
const urlsValidator = require("./validators/urlsValidator");
const urlsController = require("../app/controllers/urlsController");

router.post(
  "/url-shortener",
  urlsValidator.URLCreate,
  runValidation,
  urlsController.create
); // CREATE HASH LINK
router.get("/:hash", urlsController.redirect);

module.exports = router;

//router.get("/urls", urlsController.list);
//router.get("/urls/:id", urlsController.show);
//router.put("/urls/:id", urlsController.update);
//router.delete("/urls/:id", urlsController.destory);
