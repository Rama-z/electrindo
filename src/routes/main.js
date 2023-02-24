const express = require("express");
// const database = require("../config/postgre");

const authRouter = require("./auth");

const mainApp = express.Router();
mainApp.use("/auth", authRouter);
// mainApp.use("/product");
// mainApp.use("/profile");
// mainApp.use("/transaction");

mainApp.get("/", (req, res) => {
  res.render("home", { text: "Success" });
});

module.exports = mainApp;
