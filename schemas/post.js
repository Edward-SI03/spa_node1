const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  // postId: {
  //   type: String,
  // },
  user: {
    type: String,
    required: true,
  },
  password:{
    type: Number,
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
    type: Date
  },
});

module.exports = mongoose.model("Post", postSchema, "posts");
