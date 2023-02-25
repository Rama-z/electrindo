const profileModel = require("../model/profile");
const sendResponse = require("../helper/response");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const response = await profileModel.getProfile(req.userPayload.id);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  getAllUser: async (req, res) => {
    try {
      const response = await profileModel.getAllUser();
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  banUser: async (req, res) => {
    try {
      const response = await profileModel.banUser(req.body, req.params.id);
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
  editProfile: async (req, res) => {
    try {
      const response = await profileModel.editProfile(
        req.body,
        req.userPayload.id,
        req.file
      );
      return sendResponse.success(res, response.status || 201, response);
    } catch (err) {
      return sendResponse.error(res, err.status || 501, err);
    }
  },
};
