const connection = require("../config/mysql");

module.exports = {
  postUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          delete newResult.user_password;
          resolve(newResult);
        } else {
          resolve(new Error(error));
        }
      });
    });
  },
  postPin: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO user SET ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData,
            };
            delete newResult.user_password;
            resolve(newResult);
          } else {
            resolve(new Error(error));
          }
        }
      );
    });
  },
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_email = ?",
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  checkNumber: (phone) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * from user where user_phone = ?",
        phone,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  checkPinById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user_pin from user where user_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  checkKey: (keys) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_key = ?",
        keys,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  changePassword: (setData, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE user_email = ?",
        [setData, email],
        (error, result) => {
          if (!error) {
            const newResult = {
              user_email: email,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
