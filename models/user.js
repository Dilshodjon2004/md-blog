const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please, enter your username!"],
  },
  email: {
    type: String,
    required: [true, "Please, enter your email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please, enter your password!"],
  },
});


const User = mongoose.model("User", UsersSchema);
module.exports = User;
