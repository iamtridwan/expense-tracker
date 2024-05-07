require("express-async-errors");
require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const errorHandler = require("./handlers/errorHandler");
const userRoutes = require("./modules/users/users.routes");
const transactionsRoutes = require("./modules/transactions/transactions.routes");

const app = express();


//connection to db
mongoose.connect(process.env.DB_CONNECTION_STRING, {}).then(() => {
    console.log("Mongoose connected successfully")
}).catch(() => {
    console.log("Mongoose connection failed")
})

// db initialization
require("./models/users.models")
require("./models/transactions.models");
//middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes)
app.use("/api/transactions", transactionsRoutes)
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "failed",
        message: "Not Found"
    });
    next();
})
app.use(errorHandler);

app.listen(5500, () => console.log("server started"));