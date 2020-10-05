const midTransClient = require("midtrans-client");

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
};
