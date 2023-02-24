const productRouter = require("express").Router();
const productController = require("../controller/product");
const { isLogin } = require("../middleware/isLogin");

// productRouter.get("/");
