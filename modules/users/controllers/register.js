const mongoose = require("mongoose");
const jwtManager = require("../../../utils/jwtManager");
const emailHandler = require("../../../utils/emailHandler");
const hashPassword = require("../../../utils/hashPassword");

const register = async (req, res) => {
  const userModel = mongoose.model("users");
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const { name, email, password, balance } = req.body;

  if (!emailPattern.test(email)) throw new Error("Invalid email address");
  const getDup = await userModel.findOne({
    email,
  });

  if (getDup) throw new Error("This email is already in use");
  if (password.length < 8)
    throw new Error("password is too short. A minimum of 8 characters");

  const hashedPassword = await hashPassword(password);
  //   assignment might not be necessary if users needs to validate their account
  const createdUser = await userModel.create({
    name,
    email,
    balance,
    password: hashedPassword,
  });

  // if you need to set access token at registration
  const authToken = jwtManager(createdUser);
  //   sending email to users after registration: we're using mailtrap.io
  emailHandler(
    createdUser.email,
    "Welcome to Expense Tracker",
    "Welcome to expense tracker application. We hope you can manage your expenses easily on our platform"
  );
  res.status(201).json({
    status: "success",
    message: "user created successfully",
    data: {
      token: authToken,
    },
  });
};

module.exports = register;
