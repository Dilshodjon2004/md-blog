const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    } else {
      return res.redirect("/login");
    }
  } catch (err) {
    console.error("Error finding user:", err);
  }
};
