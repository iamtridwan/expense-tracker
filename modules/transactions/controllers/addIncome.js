const mongoose = require("mongoose");
const validator = require("validator");

const addIncome = async (req, res) => {
  const userModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");
  const { amount, remarks } = req.body;
  if(!amount) throw new Error("Amount is required");
  if(!remarks) throw new Error("Transaction remarks is required");
  if (amount < 0)
    throw new Error("Invalid amount");
  if (!validator.isNumeric(amount?.toString()))
    throw new Error("Invalid amount");

  const transaction = await transactionModel.create({
    amount,
    remarks,
    user_id: req.user?.id,
    transaction_type: "income",
  });

  if (transaction) {
    await userModel.updateOne(
      {
        _id: req.user.id,
      },
      {
        $inc: {
          balance: amount,
        },
      }, {
        runValidators:true
      }
    );
  }
  res.status(201).json({
    status: "success",
    message: "Income added successfully",
  });
};

module.exports = addIncome;
