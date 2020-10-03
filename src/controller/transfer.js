const {
  postTransaction,
  postTransfer,
  updateSaldo,
  getUserSaldo,
} = require("../model/transfer");
const fs = require("fs");
const helper = require("../helper/index");
const qs = require("querystring");

module.exports = {
  addTansfer: async (request, response) => {
    try {
      const { user_id, target_id, tf_nominal, tf_desc } = request.body;
      const setData = {
        user_id,
        target_id,
        tf_nominal,
        tf_desc,
        tf_created_at: new Date(),
        tf_status: "success",
      };
      const result = await postTransfer(setData);
      const getSaldoSender = await getUserSaldo(user_id);
      const getSaldoTarget = await getUserSaldo(target_id);

      console.log(getSaldoSender);
      const newSaldoSender = {
        user_saldo: parseInt(getSaldoSender) - tf_nominal,
      };
      const updateSaldoSender = await updateSaldo(newSaldoSender, user_id);
      const newSaldoTarget = {
        user_saldo: parseInt(getSaldoTarget) + tf_nominal,
      };
      const updateSaldoTarget = await updateSaldo(newSaldoTarget, target_id);
      // console.log(result);

      return helper.response(response, 201, "Transfer Success", setData);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
