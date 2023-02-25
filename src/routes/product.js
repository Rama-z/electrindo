const productRouter = require("express").Router();
const productController = require("../controller/product");
const { isLogin } = require("../middleware/isLogin");

productRouter.get("/", productController.getProduct);
productRouter.get("/:id", productController.getProductDetail);
productRouter.post("/create", isLogin, productController.createProduct);
productRouter.patch("/edit/:id", isLogin, productController.editProduct);
productRouter.delete("/delete/:id", isLogin, productController.deleteProduct);

module.exports = productRouter;
