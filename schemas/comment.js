const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  // commentId: {
  //   type: String,
  // },
  userId: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Comment", commentSchema, "comments");
