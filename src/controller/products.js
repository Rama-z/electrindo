const productModel = require("../model/products");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const response = await productModel.createProduct(req.body);
      return res.status(201).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (req, res) => {
    try {
      const response = await productModel.getProduct();
      return res.status(201).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const response = await productModel.deleteProduct(req.params.id);
      return res.status(201).json(response);
    } catch (err) {
      console.log(err);
    }
  },
};
