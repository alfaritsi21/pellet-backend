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
      const { user, target, nominal, desc } = request.body;

      const setData = {
        user_id: user,
        target_id: target,
        tf_nominal: nominal,
        tf_desc: desc,
        tf_created_at: new Date(),
        tf_status: "success",
      };
      const result = await postTransfer(setData);
      const setData2 = {
        user_id: user,
        target_id: target,
        trans_type: "Transfer",
        trans_nominal: nominal,
        created_at: new Date(),
        trans_status: "success",
      };
      console.log(setData2);

      const addTransaction = await postTransaction(setData2);
      const getSaldoSender = await getUserSaldo(user);
      const getSaldoTarget = await getUserSaldo(target);

      // console.log(getSaldoSender);
      const newSaldoSender = {
        user_saldo: parseInt(getSaldoSender) - nominal,
      };
      const updateSaldoSender = await updateSaldo(newSaldoSender, user);
      const newSaldoTarget = {
        user_saldo: Number(getSaldoTarget) + Number(nominal),
      };
      const updateSaldoTarget = await updateSaldo(newSaldoTarget, target);
      // console.log(result);

      return helper.response(
        response,
        201,
        "Transfer Success",
        setData,
        setData2
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
