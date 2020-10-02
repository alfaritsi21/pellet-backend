const helper = require("../helper/index.js");
const { createPayment } = require("../model/payment");

module.exports = {
  postPayment: async (request, response) => {
    try {
      // ==========NOMIDTRANS============
      // model1
      //proses to database TOPUP
      // set data topupid,userId,nominal,created_at
      //   model2
      // update ke table user:user_saldo
      //   ===========MIDTRANS=========
      // model1
      //proses to database TOPUP
      // set data topupid,userId,nominal,status,created_at
      //   result
      const { id_topup, nominal } = request.body;
      const topup = await createPayment(id_topup, nominal);
    } catch (error) {
      console.log(error);
    }
  },
};
