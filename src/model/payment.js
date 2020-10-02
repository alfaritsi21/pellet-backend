const midTransClient = require("midtrans-client");

module.exports = {
  createPayment: () => {
    return new Promise((resolve, reject) => {
      let snap = new midTransClient.Snap({
        isProduction: false,
        serverKey: "",
        clientKey: "",
      });
      console.log(id_topup);
      console.log(nominal);
    });
  },
};
