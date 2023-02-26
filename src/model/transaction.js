const database = require("../config/postgres");

module.exports = {
  getHistory: (id) => {
    return new Promise((resolve, reject) => {
      const query =
        "select ti.transaction_id, t.user_id, t.address, ti.product_id, p.product_name, p.product_price, p.product_image_url, p.brand, p.product_info, ti.quantity, ti.subtotal, t.total from transactions t join transaction_item ti on ti.transaction_id = t.id join products p on p.uniq_id = ti.product_id where t.user_id = $1";
      database.query(query, [id], (err, result) => {
        if (err) {
          console.log(err);
          return reject({
            status: 501,
            message: "Internal server error",
            err,
          });
        }
        console.log(result.rows);
        return resolve({
          status: 201,
          message: "Success",
          result: result.rows,
        });
      });
    });
  },
  createTransaction: (body, id) => {
    return new Promise((resolve, reject) => {
      const query =
        "insert into transactions (user_id, address, total) values ($1, $2, $3) returning *";
      database.query(query, [id, body.address, body.total], (err, result) => {
        if (err) {
          console.log(err);
          return reject({
            status: 501,
            message: "Internal server error",
            err,
          });
        }
        return resolve({
          status: 201,
          message: "Success",
          result: result.rows[0],
        });
      });
    });
  },
  createItem: async (products, transactionId) => {
    return await Promise.all(
      products.map((product) => {
        return new Promise((resolve, reject) => {
          const query =
            "insert into transaction_item (transaction_id, product_id, quantity, subtotal) values ($1, $2, $3, $4) returning *";
          const values = [
            transactionId,
            product.product_id,
            product.quantity,
            product.subtotal,
          ];
          database.query(query, values, (err, result) => {
            if (err) {
              console.log(err);
              return reject({
                status: 501,
                message: "Internal server error",
                err,
              });
            }
            return resolve(result.rows[0]);
          });
        });
      })
    );
  },
  deleteTransaction: (transactionId) => {
    return new Promise((resolve, reject) => {
      const query = "delete from transactions where id = $1";
      const queryItem =
        "delete from transaction_item where transaction_id = $1";
      database.query(query, [transactionId], (err) => {
        if (err) {
          return reject({
            status: 501,
            message: "Internal server error",
            err,
          });
        }
        database.query(queryItem, [transactionId], (errs) => {
          if (errs) {
            return reject({
              status: 501,
              message: "Internal server error",
              errs,
            });
          }
          return resolve({
            status: 201,
            message: "Success delete item",
          });
        });
      });
    });
  },
};
