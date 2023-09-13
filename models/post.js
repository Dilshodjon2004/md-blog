const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  content: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
