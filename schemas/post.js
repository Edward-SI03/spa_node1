const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  // postId: {
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
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  likeUsers: {
    type: Object,
  },
  likes: {
    type: Number,
  },
});

module.exports = mongoose.model("Post", postSchema, "posts");
