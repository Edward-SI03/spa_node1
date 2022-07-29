const express = require("express");
const router = express.Router();

const postsRouter = require("./posts");
const commentsRouter = require("./comments")
const usersRouter = require("./users")

router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/", usersRouter);

module.exports = router