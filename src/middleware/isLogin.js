const jwt = require("jsonwebtoken");
const sendResponse = require("../helper/response");
const database = require("../config/postgres");

const isLogin = async (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token)
    return sendResponse.error(res, 401, {
      status: 401,
      message: "You have to login first",
      data: null,
    });

  const checkWhitelistToken = (token) => {
    return new Promise((resolve, reject) => {
      const query = "select * from whitelist where token = $1";
      database.query(query, [token], (error, result) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        resolve(result);
      });
    });
  };

  const checkWhiteListToken = await checkWhitelistToken(token);
  if (checkWhiteListToken.rows.length === 0) {
    return sendResponse.error(res, 400, {
      status: 400,
      message: "You have to login first",
    });
  }

  //   verifikasi
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    { issuer: process.env.ISSUER },
    async (error, decodedPayload) => {
      if (error) {
        console.log(error);
        return sendResponse.error(res, 403, {
          status: 403,
          message: "Authentication failed",
          error: error.message,
        });
      }
      req.userPayload = decodedPayload;
      next();
    }
  );
};

module.exports = { isLogin };
