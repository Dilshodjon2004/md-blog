const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save();
    res.redirect("/login");
  } catch (err) {
    if (err) {
      const registrationError = Object.values(err.errors).map(
        (error) => error.message
      );
      req.flash("data", req.body);
      req.flash("registrationError", registrationError);
      return res.redirect("/reg");
    }
    res.status(500).send("An error occurred while creating the user.");
  }
};
