const mongoose = require("mongoose");
const emailHandler = require("../../../utils/emailHandler");
const forgotPassword = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw new Error("Email is required");

  const getUser = await userModel.findOne({
    email,
  });
  if (!getUser) throw new Error("User does not exist");
  const resetCode = Math.floor(10000 + Math.random() * 90000);
  await userModel.updateOne(
    {
      _id: getUser?._id,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );

  emailHandler(
    getUser.email,
    "Password Reset",
    `Hello ${getUser.name}, here is the reset code to change your password ${resetCode}`,
    `<div>
        <h1>Hello ${getUser.name},</h1>
        <p>Here is the reset code to change your password ${resetCode}</p>
        </div>`
  );
  res.status(201).json({
    status: "success",
    message: "Reset code sent to email successfully",
  });
};
module.exports = forgotPassword;
