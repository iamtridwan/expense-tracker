const mongoose = require("mongoose");
const validator = require("validator");
const addExpense = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const userModel = mongoose.model("users");

  const { amount, remarks } = req.body;
  if (!amount) throw new Error("Amount is required");
  if (!remarks) throw new Error("Transaction remarks is required");
  if (!validator.isNumeric(amount.toString()))
    throw new Error("Invalid amount");
  if (amount < 0)
    throw new Error("Invalid amount");
  const transaction = await transactionModel.create({
    user_id: req.user.id,
    amount,
    remarks,
    transaction_type: "expenses",
  });
  if (transaction) {
    await userModel.updateOne(
      {
        _id: req.user.id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      },
      {
        reValidators: true,
      }
    );
  }
  res.status(201).json({
    status: "success",
    message: "Transaction added successfully",
  });
};
module.exports = addExpense;
