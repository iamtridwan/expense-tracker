const mongoose = require("mongoose");
const userDashboard = async (req, res) => {
  const userModel = mongoose.model("users");
  const getUser = await userModel
    .findOne({
      _id: req.user.id,
    })
    .select("name balance email createdAt");
  res.status(200).json({
    status: "success",
    message: "user dashboard",
    data: getUser,
  });
};

module.exports = userDashboard;
