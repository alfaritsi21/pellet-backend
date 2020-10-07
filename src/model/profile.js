const connection = require("../config/mysql");

module.exports = {
  getAllUsers: (search, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT user_id, user_email,user_name,first_name,last_name,user_phone,user_img,user_saldo FROM user WHERE user_name LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [search, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getUserCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM user ",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_id = ?",
        id,
        (error, result) => {
          if (!error) {
            result.map((value) => {
              delete value.user_password;
              delete value.user_key;
            });
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  patchUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE user_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              user_id: id,
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
  searchUserName: (search_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user  WHERE first_name LIKE "%"?"%" OR last_name LIKE "%"?"%" OR user_phone LIKE "%"?"%"`,
        [search_name, search_name, search_name],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  checkPassById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user_password FROM user WHERE user_id = ?",
        id,
        (error, result) => {
          if (!error) {
            result.map((value) => {
              //   delete value.user_password;
              delete value.user_key;
            });
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  deletePhone: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET opt_phone = '' WHERE user_id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  deleteImage: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET user_img = 'blank-profile.jpg' WHERE user_id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
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
