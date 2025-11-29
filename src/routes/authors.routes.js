const express = require("express");
const router = express.Router();
const authorsController = require("../controllers/authors.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
  idParamValidation,
  createAuthorValidation,
  updateAuthorValidation
} = require("../validations/authors.validation");

router.get("/", asyncHandler(authorsController.list));
router.get("/:id", idParamValidation, asyncHandler(authorsController.get));
router.post("/", createAuthorValidation, asyncHandler(authorsController.create));
router.put("/:id", updateAuthorValidation, asyncHandler(authorsController.update));
router.delete("/:id", idParamValidation, asyncHandler(authorsController.remove));

module.exports = router;
