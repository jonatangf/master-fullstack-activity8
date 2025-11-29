const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
  idParamValidation,
  authorIdParamValidation,
  listPostsValidation,
  createPostValidation,
  updatePostValidation
} = require("../validations/posts.validation");

router.get("/", listPostsValidation, asyncHandler(postsController.list));
router.get("/author/:authorId", authorIdParamValidation, asyncHandler(postsController.getByAuthor));
router.get("/:id", idParamValidation, asyncHandler(postsController.get));
router.post("/", createPostValidation, asyncHandler(postsController.create));
router.put("/:id", updatePostValidation, asyncHandler(postsController.update));
router.delete("/:id", idParamValidation, asyncHandler(postsController.remove));

module.exports = router;
