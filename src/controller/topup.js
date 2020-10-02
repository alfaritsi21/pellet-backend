const helper = require("../helper/index.js");
const { postTopup, postTransaction } = require("../model/topup");
const { checkNumber } = require("../model/user");
const { patchUser } = require("../model/profile");

module.exports = {
  postTopup: async (request, response) => {
    const { user_id, user_phone, nominal } = request.body;
    const chance = Math.floor(Math.random() * 2);
    const setData = {
      user_id,
      topup_nominal: nominal,
      created_at: new Date(),
      topup_status: chance === 1 ? "success" : null,
    };

    const checkUser = await checkNumber(user_phone);
    const setData2 = {
      user_saldo: Number(nominal) + Number(checkUser[0].user_saldo),
    };
    const setData3 = {
      user_id,
      target_id: user_id,
      trans_type: "Top up",
      trans_nominal: nominal,
      created_at: new Date(),
      trans_status: chance === 1 ? "success" : null,
    };
    try {
      if (checkUser.length > 0) {
        if (chance === 1) {
          const result = await postTopup(setData);
          const result2 = await patchUser(setData2, user_id);
          const result3 = await postTransaction(setData3);
          return helper.response(
            response,
            200,
            "Top up success",
            result,
            result2,
            result3
          );
        } else {
          return helper.response(response, 400, "Top up Failed");
        }
      } else {
        return helper.response(response, 400, "Invalid phone number");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};