const connection = require("../config/mysql");

module.exports = {
  getAllTopup: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM topup", (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          resolve(new Error(error));
        }
      });
    });
  },
  postTopup: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO topup SET ?", setData, (error, result) => {
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
};
