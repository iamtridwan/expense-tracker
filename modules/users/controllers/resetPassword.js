const mongoose = require("mongoose");
const hashPassword = require("../../../utils/hashPassword");
const emailHandler = require("../../../utils/emailHandler");

const resetPassword = async (req, res) => {
  const { email, password, reset_code } = req.body;
  const userModel = mongoose.model("users");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  if (!reset_code) throw new Error("Reset code is required");
  if (password.length < 8)
    throw new Error("password is too short. A minimum of 8 characters");
  const getUser = await userModel.findOne({
    email,
  });

  if (!getUser) throw new Error("Email does not exist");
  if (getUser.reset_code != reset_code) throw new Error("Invalid reset code");

  const hashedPassword = await hashPassword(password);
  await userModel.updateOne(
    {
      _id: getUser._id,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  emailHandler(email, "Password Reset", "Password reset successful");

  res.status(201).json({
    status: "success",
    message: "password updated successfully",
    data: null
  });
};

module.exports = resetPassword;
