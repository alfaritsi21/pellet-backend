const midTransClient = require("midtrans-client");
const connection = require("../config/mysql");

module.exports = {
  createPayment: (id_topup, nominal) => {
    return new Promise((resolve, reject) => {
      let snap = new midTransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-HUqP4K69c5VLR3DURHKmoGpD",
        clientKey: "SB-Mid-client-tNYBiZTwn--3VTLB",
      });

      let parameter = {
        transaction_details: {
          order_id: id_topup,
          gross_amount: nominal,
        },
        credit_card: {
          secure: true,
        },
      };

      snap
        .createTransaction(parameter)
        .then((transaction) => {
          console.log(transaction);
          resolve(transaction.redirect_url);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  postTransaction: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO transaction SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const res = { result };
            resolve(res);
          } else {
            reject(new Error(error));
          }
          // if (!error) {
          //   const newResult = {
          //     id: result.insertId,
          //     ...setData,
          //   };
          //   delete newResult.user_password;
          //   resolve(newResult);
          // } else {
          //   resolve(new Error(error));
          // }
        }
      );
    });
  },
  updateSaldo: (setData, id) => {
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
  getUserSaldo: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT user_saldo FROM user WHERE user_id = ${user_id}`,
        (error, result) => {
          !error ? resolve(result[0].user_saldo) : reject(new Error(error));
        }
      );
    });
  },
};
