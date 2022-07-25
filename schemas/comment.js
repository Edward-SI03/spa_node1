const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  // commentId: {
  //   type: String,
  // },
  user: {
    type: String,
    require: true,
  },
  password: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Comment", commentSchema, "comments");
