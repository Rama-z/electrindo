const database = require("../config/postgres");

module.exports = {
  getProfile: () => {
    return new Promise((resolve, reject) => {
      const query = "";
      database.query(query, [], (err, result) => {
        if (err) {
          return reject({
            status: 501,
            message: "Internal server error",
            err,
          });
        }
        return resolve({
          status: 201,
          message: "Success",
          result: result,
        });
      });
    });
  },
  editProfile: () => {
    return new Promise((resolve, reject) => {
      const query = "";
      database.query(query, [], (err, result) => {
        if (err) {
          return reject({
            status: 501,
            message: "Internal server error",
            err,
          });
        }
        return resolve({
          status: 201,
          message: "Success",
          result: result,
        });
      });
    });
  },
  deleteProfile: () => {
    return new Promise((resolve, reject) => {
      const query = "";
      database.query(query, [], (err, result) => {
        if (err) {
          return reject({
            status: 501,
            message: "Internal server error",
            err,
          });
        }
        return resolve({
          status: 201,
          message: "Success",
          result: result,
        });
      });
    });
  },
};
