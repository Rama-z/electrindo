const database = require("../config/postgres");

module.exports = {
  getProfile: (id) => {
    return new Promise((resolve, reject) => {
      const query =
        "select id, email, username, gender, roles, address, image, status from users u where u.id = $1";
      database.query(query, [id], (err, result) => {
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
  editProfile: (body, id, file) => {
    return new Promise((resolve, reject) => {
      let query = "update users set ";
      const queryCheck = "select * from users where id = $1";
      let values = [];
      let imageUrl = "";
      if (file) {
        imageUrl = `${file.secure_url}`;
        if (Object.keys(body).length > 0) {
          query += ` image = '${imageUrl}', `;
        }
        if (Object.keys(body).length === 0) {
          query += ` image = '${imageUrl}', where id = $1 returning id, email, username, email, gender, address, image, status `;
          values.push(id);
        }
      }
      database.query(queryCheck, [id], (errCheck, resultCheck) => {
        if (errCheck) {
          console.log(errCheck);
          return reject({
            status: 501,
            message: "Internal server error",
            errCheck,
          });
        }
        if (Object.keys(body).length === 0) {
          return resolve({
            status: 201,
            message: `${resultCheck.rows[0].username}, your profile successfully updated`,
          });
        }
        Object.keys(body).forEach((key, index, array) => {
          if (index === array.length - 1) {
            query += ` ${key} = $${index + 1} where id = $${
              index + 2
            } returning id, email, username, email, gender, address, image, status`;
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
          let data = {};
          if (file) data = { Image: imageUrl, ...result.rows[0] };
          data = { ...result.rows[0] };
          return resolve({
            status: 201,
            message: `${result.rows[0].username}, your profile successfully updated`,
            data,
          });
        });
      });
    });
  },
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      const query =
        "select id, email, username, gender, roles, address, image, status from users";
      database.query(query, (err, result) => {
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
        });
      });
    });
  },
  banUser: (body, id) => {
    return new Promise((resolve, reject) => {
      const queryCheck = "select status from users where id = $1";
      const query = "update users set status = $1 where id = $2";
      database.query(queryCheck, [id], (errCheck, resultCheck) => {
        if (errCheck) {
          console.log(errCheck);
          return reject({
            status: 501,
            message: "Internal server error",
            errCheck,
          });
        }
        if (Object.values(resultCheck.rows[0]) == body.status) {
          return reject({
            status: 403,
            message: `Already ${body.status}`,
          });
        }
        database.query(query, [body.status, id], (err, result) => {
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
            message: "Success change status of the account",
            result: result.rows,
          });
        });
      });
    });
  },
};
