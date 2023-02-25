const sendResponse = require("../helper/response");

module.exports = (...allowedRole) => {
  return (req, res, next) => {
    const payload = req.userPayload;
    let isAllowed = false;
    for (let roles of allowedRole) {
      if (roles !== payload.roles) continue;
      isAllowed = true;
      break;
    }
    if (!isAllowed) {
      return sendResponse.error(res, 403, {
        message: "Forbidden",
        err: "You don't have the right to do that",
      });
    }
    next();
  };
};
