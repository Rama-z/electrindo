const express = require("express");
// const database = require("../config/postgre");

const authRouter = require("./auth");
const productRouter = require("./product");
const profileRouter = require("./profile");
const transactionRouter = require("./transaction");

const mainApp = express.Router();
mainApp.use("/auth", authRouter);
mainApp.use("/product", productRouter);
mainApp.use("/profile", profileRouter);
mainApp.use("/transaction", transactionRouter);

mainApp.get("/", (req, res) => {
  res.render("home", { text: "Success" });
});

module.exports = mainApp;
