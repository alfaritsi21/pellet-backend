const connection = require("../config/mysql");

module.exports = {
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
