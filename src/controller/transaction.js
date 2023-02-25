const transactionModel = require("../model/transaction");
const sendResponse = require("../helper/response");

module.exports = {
  getHistory: async (req, res) => {
    try {
      const response = await transactionModel.getHistory(req.userPayload.id);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  createTransaction: async (req, res) => {
    try {
      const response = await transactionModel.createTransaction(
        req.body,
        req.userPayload.id
      );
      const responseItem = await transactionModel.createItem(
        req.body.product_item,
        response.result.id
      );
      let transaction_item = [];
      responseItem.map((product) => {
        const temp = {
          transaction_id: response.result.id,
          product_id: product.product_id,
          quantity: product.quantity,
          subtotal: product.subtotal,
        };
        transaction_item.push(temp);
      });
      const results = {
        result: {
          id: response.result.id,
          user_id: req.userPayload.id,
          address: req.body.address,
          transaction_item,
          total: req.body.total,
        },
      };
      return sendResponse.success(res, response.status || 201, results);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  deleteTransaction: async (req, res) => {
    try {
      const response = await transactionModel.deleteTransaction(req.params.id);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
};
