const mongoose = require("mongoose");
const validator = require("validator");
const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const userModel = mongoose.model("users");

  const { transaction_id } = req.params;

  const { remarks, amount, transaction_type } = req.body;

  if (!transaction_id) throw new Error("transaction id is required");
  if (!validator.isMongoId(transaction_id.toString()))
    throw new Error("Invalid transaction id");
  if (!remarks) throw new Error("Remarks is required");
  if (!amount) throw new Error("Amount is required");
  if (!transaction_type) throw new Error("Transaction type is required");
  const transaction = await transactionModel.findOne({
    _id: transaction_id,
  });
  if (!transaction) throw new Error("transaction does not exist");
  if (transaction_type === "income" && transaction.transaction_type !== "income") {
    await userModel.updateOne(
      {
        _id: transaction.user_id,
      },
      {
        $inc: {
          balance: transaction.amount,
        },
      }
    );
  } else if(transaction_type === "expenses"  && transaction.transaction_type !== "expenses"){
    await userModel.updateOne(
      {
        _id: transaction.user_id,
      },
      {
        $inc: {
          balance: transaction.amount * -1,
        },
      }
    );
  } else {
    
  }
  await transactionModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      amount,
      remarks,
      transaction_type,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "transaction updated successfully",
  });
};

module.exports = editTransaction;
