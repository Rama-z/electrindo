const database = require("../config/postgres");

module.exports = {
  getProduct: (queryParams, api) => {
    return new Promise((resolve, reject) => {
      let productName = queryParams.product_name || "";
      let maxPrice = queryParams.maxPrice || 9999999999;
      let minPrice = queryParams.minPrice || 0;
      let brand = queryParams.brand || "";
      let order = !queryParams.order
        ? " order by product_name asc "
        : queryParams.ascending_order === "asc"
        ? ` order by ${queryParams.order} asc `
        : ` order by ${queryParams.order} desc `;
      let limit = queryParams.limit || 20;
      let page = queryParams.page || 0;
      if (maxPrice <= minPrice) {
        return reject({
          status: 403,
          message: "MaxPrice cannot less than MinPrice",
        });
      }
      let offset =
        !page || page === "1" ? 0 : (parseInt(page) - 1) * parseInt(limit);
      const query = `select uniq_id, product_name, product_price, brand, product_image_url, product_info, real_pdp_url from products p where lower(product_name) like lower($1) and product_price <= $2 and product_price >= $3 and lower(brand) like lower($4) ${order} limit $5 offset $6`;
      const queryCount = `select count(distinct p.id) as count from products p where lower(product_name) like lower($1) and product_price <= $2 and product_price >= $3 and lower(brand) like lower($4)`;
      let link = `${api}/product?`;
      const values = [
        `%${productName}%`,
        maxPrice,
        minPrice,
        `%${brand}%`,
        limit,
        offset,
      ];
      database.query(
        queryCount,
        [`%${productName}%`, maxPrice, minPrice, `%${brand}%`],
        (errCount, resultCount) => {
          if (errCount) {
            console.log(errCount);
            return reject({
              status: 501,
              message: "Internal server error",
              errCount,
            });
          }
          console.log(resultCount.rows[0]);
          const totalData = resultCount.rows[0].count;
          const currentPage = page ? parseInt(page) : 1;
          const totalPage =
            parseInt(limit) > totalData
              ? 1
              : Math.ceil(totalData / parseInt(limit));
          const prev =
            currentPage === 1
              ? null
              : link + `page=${currentPage - 1}&limit=${parseInt(limit)}`;
          const next =
            currentPage === totalPage
              ? null
              : link + `page=${currentPage + 1}&limit=${parseInt(limit)}`;
          const meta = {
            page: currentPage,
            totalPage,
            limit: parseInt(limit),
            totalData: parseInt(totalData),
            prev,
            next,
          };
          database.query(query, values, (err, result) => {
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
              result: result.rows,
              meta,
            });
          });
        }
      );
    });
  },
  getProductDetail: (id) => {
    return new Promise((resolve, reject) => {
      const query = "select * from products p where p.uniq_id = $1";
      database.query(query, [id], (err, result) => {
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
          result: result.rows[0],
        });
      });
    });
  },
  createProduct: (body) => {
    return new Promise((resolve, reject) => {
      const queryGetUniqId = "select uniq_id from products where uniq_id = $1";
      const query =
        "insert into products (uniq_id, product_name, product_price, brand, product_image_url, product_info, real_pdp_url) values ($1, $2, $3, $4, $5, $6, $7) returning *";
      let values = [
        body.uniq_id,
        body.product_name,
        body.product_price,
        body.brand,
        body.product_image_url,
        body.product_info,
        body.real_pdp_url,
      ];
      database.query(queryGetUniqId, [body.uniq_id], (errs, results) => {
        if (errs) {
          console.log(errs);
          return reject({
            status: 501,
            message: "Internal server error",
            errs,
          });
        }
        if (results.rows[0]) {
          return reject({
            status: 403,
            message: "This product has been input",
          });
        }
        database.query(query, values, (err, result) => {
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
            message: "Success input product",
            result: result.rows[0],
          });
        });
      });
    });
  },
  editProduct: (body, id) => {
    return new Promise((resolve, reject) => {
      let query = "update products set";
      let values = [];
      if (Object.keys(body).length === 0) {
        return resolve({
          status: 201,
          message: "No change applied",
        });
      }
      Object.keys(body).forEach((key, index, array) => {
        if (index === array.length - 1) {
          query += ` ${key} = $${index + 1} where uniq_id = $${
            index + 2
          } returning *`;
          values.push(body[key], id);
          return;
        }
        query += ` ${key} = $${index + 1}, `;
        values.push(body[key]);
      });
      database.query(query, values, (err, result) => {
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
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      const query = "delete from products where uniq_id = $1 returning * ";
      database.query(query, [id], (err, result) => {
        if (err) {
          return reject({
            status: 501,
            message: "Internal server error",
            err,
          });
        }
        if (!result.rows[0]) {
          return reject({
            status: 404,
            message: "Product not found",
            err,
          });
        }
        return resolve({
          status: 201,
          message: "Success Delete Product",
          result: result.rows[0],
        });
      });
    });
  },
};
