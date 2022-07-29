const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  // postId: {
  //   type: String,
  // },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});
userSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtual: true,
});

module.exports = mongoose.model("User", userSchema, "users");
