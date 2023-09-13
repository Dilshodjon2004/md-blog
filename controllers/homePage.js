const Post = require("../models/post");

module.exports = async (req, res) => {
  // console.log(req.session);
  const posts = await Post.find().populate("author")
  // console.log(posts);
  res.render("index", { posts });
};
