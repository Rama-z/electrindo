const transactionRouter = require("express").Router();
const transactionController = require("../controller/transaction");
const { isLogin } = require("../middleware/isLogin");
const allowedRole = require("../middleware/allowedRole");

transactionRouter.get("/history", isLogin, transactionController.getHistory);

transactionRouter.post(
  "/create",
  isLogin,
  allowedRole("customer", "admin"),
  transactionController.createTransaction
);

transactionRouter.delete(
  "/delete/:id",
  isLogin,
  allowedRole("customer", "admin"),
  transactionController.deleteTransaction
);

module.exports = transactionRouter;
