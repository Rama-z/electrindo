const productRouter = require("express").Router();
const productController = require("../controller/product");
const { isLogin } = require("../middleware/isLogin");
const allowedRole = require("../middleware/allowedRole");

productRouter.get("/", productController.getProduct);
productRouter.get("/:id", productController.getProductDetail);
productRouter.post(
  "/create",
  isLogin,
  allowedRole("admin"),
  productController.createProduct
);
productRouter.patch(
  "/edit/:id",
  isLogin,
  allowedRole("admin"),
  productController.editProduct
);
productRouter.delete(
  "/delete/:id",
  isLogin,
  allowedRole("admin"),
  productController.deleteProduct
);

module.exports = productRouter;
