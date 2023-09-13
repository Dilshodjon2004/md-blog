const User = require("../models/user");

module.exports = (req, res, next) => {
  User.findById(req.session.userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/reg");
      }
      next();
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      return res
        .status(500)
        .send("An error occurred while checking user authentication.");
    });
};
