const express = require("express");
const router = express.Router();

const authorsRoutes = require("./authors.routes");
const postsRoutes = require("./posts.routes");

router.use("/authors", authorsRoutes);
router.use("/posts", postsRoutes);

module.exports = router;
