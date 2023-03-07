const express = require("express");

const productRouter = require("./products");

const mainApp = express.Router();
mainApp.use("/product", productRouter);

mainApp.get("/", (req, res) => {
  res.render("home", { text: "Success" });
});

module.exports = mainApp;
