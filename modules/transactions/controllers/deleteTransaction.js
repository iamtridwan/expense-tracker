const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const userModel = mongoose.model("users");
  const { transaction_id } = req.params;

  if (!transaction_id) throw new Error("transaction id is not given");
  if (!validator.isMongoId(transaction_id.toString()))
    throw new Error("invalid transaction id");
  const transaction = await transactionModel.findOne({
    _id: transaction_id,
  });
  if(!transaction) throw new Error("Transaction not found")
  if (transaction.transaction_type === "income") {
    await userModel.updateOne(
      {
        _id: req.user.id,
      },
      {
        $inc: {
          balance: transaction.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    await userModel.updateOne(
      {
        _id: req.user.id,
      },
      {
        $inc: {
          balance: transaction.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }
  await transactionModel.deleteOne({
    _id: transaction_id,
  });
    console.log(transaction);

  res.status(200).json({
    status: "Transaction deleted successfully",
    data: null,
    message: "Operation successful",
  });
};

module.exports = deleteTransaction;
