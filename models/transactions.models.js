const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user id is required"],
      ref: "users",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    transaction_type: {
      type: String,
      required: [true, "transaction type is required"],
      enum: ["income", "expenses"],
    },
    remarks: {
      type: String,
      required: [true, "transaction remarks required"],
    },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;
