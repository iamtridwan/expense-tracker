const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");

const transactionsRoutes = express.Router()

// Routes.....
//protected users routes
transactionsRoutes.use(auth);
transactionsRoutes.get("/", getTransactions);
transactionsRoutes.post("/income", addIncome);
transactionsRoutes.post("/expenses", addExpense);
transactionsRoutes.delete("/:transaction_id", deleteTransaction);
transactionsRoutes.patch("/:transaction_id", editTransaction);


module.exports = transactionsRoutes;