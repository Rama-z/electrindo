const productRouter = require("express").Router();
const productController = require("../controller/products");

productRouter.get("/", productController.getProduct);
productRouter.post("/create", productController.createProduct);
productRouter.delete("/delete/:id", productController.deleteProduct);

module.exports = productRouter;
