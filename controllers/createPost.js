const Post = require("../models/post");
const path = require("path");
module.exports = async (req, res) => {
  const { image } = req.files;
  image.mv(
    path.resolve(__dirname, "..", "public/posts/", image.name),
    (err) => {
      Post.create({
        ...req.body,
        image: `/posts/${image.name}`,
        author: req.session.userId,
      }).then((err, post) => {
        res.redirect("/");
      });
    }
  );
};
