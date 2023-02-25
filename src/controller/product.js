const productModel = require("../model/product");
const sendResponse = require("../helper/response");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const response = await productModel.createProduct(req.body);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  getProduct: async (req, res) => {
    try {
      const api = `${req.protocol}://${req.get("HOST")}`;
      const response = await productModel.getProduct(req.query, api);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  getProductDetail: async (req, res) => {
    try {
      const response = await productModel.getProductDetail(req.params.id);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  editProduct: async (req, res) => {
    try {
      const response = await productModel.editProduct(req.body, req.params.id);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const response = await productModel.deleteProduct(req.params.id);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
};
