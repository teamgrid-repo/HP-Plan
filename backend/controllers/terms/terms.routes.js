const express = require("express");
const {
  authentication,
  authorization,
} = require("../../middleware/middleware");
const termsController = require("./terms.controller");
const router = express.Router();

router.put(
  "/terms",
  authentication,
  authorization,
  termsController.updateTerms
);
router.get("/terms", authentication, authorization, termsController.getTerms);
router.put(
  "/acceptTerms",
  authentication,
  authorization,
  termsController.acceptTerms
);

module.exports = router;
