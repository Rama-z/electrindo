const transactionRouter = require("express").Router();
const transactionController = require("../controller/transaction");
const { isLogin } = require("../middleware/isLogin");

transactionRouter.get("/history", isLogin, transactionController.getHistory);

transactionRouter.post(
  "/create",
  isLogin,
  transactionController.createTransaction
);

transactionRouter.delete(
  "/delete/:id",
  isLogin,
  transactionController.deleteTransaction
);

module.exports = transactionRouter;
