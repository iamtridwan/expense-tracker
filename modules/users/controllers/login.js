const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../utils/jwtManager");
require("dotenv").config();

const login = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, password } = req.body;
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  const user = await userModel.findOne({
    email,
  });
  if (!user) throw new Error("Email or password is incorrect");
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw new Error("Email or password is incorrect");

  const accessToken = jwtManager(user);

  const userObj = {
    name: user?.name,
    email: user?.email,
    id: user?._id,
  };

  res.status(201).json({
    status: "success",
    message: "user logged in successfully",
    data: {
      token: accessToken,
      user: userObj,
    },
  });
};

module.exports = login;
