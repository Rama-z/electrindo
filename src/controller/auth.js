const authModel = require("../model/auth");
const sendResponse = require("../helper/response");

module.exports = {
  register: async (req, res) => {
    try {
      const response = await authModel.register(req.body);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  login: async (req, res) => {
    try {
      const response = await authModel.login(req.body);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  logout: async (req, res) => {
    try {
      console.log(req.header("x-access-token"));
      const response = await authModel.logout(req.header("x-access-token"));
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
};
