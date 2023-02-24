const authRouter = require("express").Router();
const authController = require("../controller/auth");
const { isLogin } = require("../middleware/isLogin");

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.delete("/logout", isLogin, authController.logout);

module.exports = authRouter;
