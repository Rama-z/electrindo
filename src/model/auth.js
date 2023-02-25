const database = require("../config/postgres");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      let queryGetEmail = "select email from users u where u.email = $1";
      let queryRegister =
        "insert into users (username, gender, email, pass, roles, address) values($1, $2, $3, $4, $5, $6)";
      database.query(queryGetEmail, [body.email], (err, result) => {
        if (err) {
          console.log(err);
          return reject({ status: 501, err: err });
        }
        if (result.rows[0]) {
          return reject({
            status: 401,
            message: "Email already in used",
            err: err,
          });
        }
        bcrypt.hash(body.password, 10, (err, hashedPassword) => {
          if (err) {
            console.log(err);
            return reject({ status: 501, err: err });
          }
          database.query(
            queryRegister,
            [
              body.username,
              body.gender,
              body.email,
              hashedPassword,
              body.roles || "customer",
              body.address,
            ],
            (errs, results) => {
              if (errs) {
                console.log(errs);
                return reject({ status: 501, err: errs });
              }
              return resolve({
                status: 200,
                message: "Register Success",
                result: results.rows,
              });
            }
          );
        });
      });
    });
  },
  login: (body) => {
    return new Promise((resolve, reject) => {
      let queryGetPassword = "select * from users u where u.email like $1";
      database.query(queryGetPassword, [body.email], (err, result) => {
        if (err) {
          console.log(err);
          return reject({ status: 501, err: err });
        }
        let hashedPassword = result.rows[0].pass;
        bcrypt.compare(body.password, hashedPassword, (err, isSame) => {
          if (err) {
            console.log(err);
            return reject({ status: 501, err: err });
          }
          if (!isSame) {
            console.log(err);
            return reject({
              status: 501,
              message: "Email/password is wrong",
              err: err,
            });
          }
          const payload = {
            id: result.rows[0].id,
            username: result.rows[0].username,
            gender: result.rows[0].gender,
            roles: result.rows[0].roles,
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1d",
            issuer: process.env.ISSUER_KEY,
          });
          let queryInputToken = "insert into whitelist (token) values ($1)";
          database.query(queryInputToken, [token], (errInput) => {
            if (errInput) {
              console.log(errInput);
              return reject({ status: 501, err: errInput });
            }
            return resolve({
              status: 200,
              result: {
                token,
                id: payload.id,
                username: payload.username,
                email: body.email,
                roles: payload.roles,
              },
            });
          });
        });
      });
    });
  },
  logout: (token) => {
    return new Promise((resolve, reject) => {
      let query = "delete from whitelist where token = $1 ";
      database.query(query, [token], (err, result) => {
        if (err) {
          console.log(err);
          return reject({ status: 501, err: err });
        }
        return resolve({
          status: 200,
          message: "logout success",
          result: result.rows,
        });
      });
    });
  },
};
