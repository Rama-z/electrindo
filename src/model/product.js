const database = require("../config/postgres");

module.exports = {
  getProduct: () => {
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
  getProductDetail: () => {
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
  createProduct: () => {
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
  editProduct: () => {
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
  deleteProduct: () => {
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
