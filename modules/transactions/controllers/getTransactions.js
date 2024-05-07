const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const transactions = await transactionModel
    .find({
      ...req.query,
      user_id: req.user.id,
    })
    .select("amount transaction_type createdAt _id")
    .sort("createdAt")
    .limit(5);
  res.status(200).json({
    status: "success",
    message: "Operation successful",
    data: transactions,
  });
};

module.exports = getTransactions;
