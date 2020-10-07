const helper = require("../helper/index.js");
const midTransClient = require("midtrans-client");

const {
  createPayment,
  postTransaction,
  postTransfer,
  updateSaldo,
  getUserSaldo,
  checkDataTopupCode,
  patchTopup,
} = require("../model/payment");
const {
  postTopup,
  getAllTopup,
  getAllUser,
  getAllTransaction,
} = require("../model/topup");
const { checkNumber } = require("../model/user");
const { patchUser } = require("../model/profile");

module.exports = {
  getTopupData: async (request, response) => {
    try {
      const data = await getAllTopup();
      return helper.response(response, 200, "Success Get Topup Data !", data);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getUserData: async (request, response) => {
    try {
      const data = await getAllUser();
      return helper.response(response, 200, "Success Get User Data !", data);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getTransactionData: async (request, response) => {
    try {
      const data = await getAllTransaction();
      return helper.response(
        response,
        200,
        "Success Get Transaction Data !",
        data
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postTopupMidtrans: async (request, response) => {
    try {
      // const { id } = request.body;
      const { nominal, user_id } = request.body;
      const setData = {
        user_id: user_id,
        topup_code: Math.floor(Math.random() * 1000000),
      };
      const result = await postTopup(setData);
      const checkTopupCode = await checkDataTopupCode(result.topup_code);

      const topUp = await createPayment(result.topup_code, nominal);
      return helper.response(response, 200, "Success Create Payment !", topUp);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  // postPayment: async (request, response) => {
  //   try {
  //     const { id_topup, nominal, user_id } = request.body;

  //     const checkTopupCode = await checkDataTopupCode(id_topup);

  //     const topUp = await createPayment(id_topup, nominal);
  //     return helper.response(
  //       response,
  //       200,
  //       "Success Create Payment !",
  //       checkDataTopupCode,
  //       topUp
  //     );
  //   } catch (error) {
  //     return helper.response(response, 400, "Bad Request", error);
  //   }
  // },
  postMidtransNotif: async (request, response) => {
    let snap = new midTransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-HUqP4K69c5VLR3DURHKmoGpD",
      clientKey: "SB-Mid-client-tNYBiZTwn--3VTLB",
    });

    snap.transaction
      .notification(request.body)
      .then(async (statusResponse) => {
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(
          `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
        );

        // Sample transactionStatus handling logic

        if (transactionStatus == "capture") {
          // capture only applies to card transaction, which you need to check for the fraudStatus
          if (fraudStatus == "challenge") {
            // TODO set transaction status on your databaase to 'challenge'
          } else if (fraudStatus == "accept") {
            // TODO set transaction status on your databaase to 'success'
          }
        } else if (transactionStatus == "settlement") {
          try {
            const {
              order_id,
              gross_amount,
              transaction_time,
              transaction_status,
            } = request.body;

            const checkTopupCode = await checkDataTopupCode(order_id);

            const setData = {
              topup_nominal: gross_amount,
              created_at: transaction_time,
              topup_status: transaction_status,
            };
            const result = await patchTopup(setData, order_id);
            const setData2 = {
              user_id: 1,
              target_id: checkDataTopupCode[0].user_id,
              trans_type: "Top Up",
              trans_nominal: gross_amount,
              created_at: transaction_time,
              trans_status: transaction_status,
            };
            const addTransaction = await postTransaction(setData2);

            const getSaldo = await getUserSaldo(setData2.target_id);

            const newSaldo = {
              user_saldo: Number(getSaldo) + Number(gross_amount),
            };
            const updateUserSaldo = await updateSaldo(
              newSaldo,
              setData2.target_id
            );

            return helper.response(
              response,
              200,
              "Success POST from MIDTRANS",
              setData,
              setData2
            );
          } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
          }

          // const checkUser = await checkNumber(user_phone);
          // const setData2 = {
          //   user_saldo: Number(nominal) + Number(checkUser[0].user_saldo),
          // };
          // const setData3 = {
          //   user_id: 1,
          //   target_id: user_id,
          //   trans_type: "Top up",
          //   trans_nominal: nominal,
          //   created_at: new Date(),
          //   trans_status: chance === 1 ? "success" : null,
          // };
          // try {
          //   if (checkUser.length > 0) {
          //     const result = await postTopup(setData);
          //     const result2 = await patchUser(setData2, user_id);
          //     const result3 = await postTransaction(setData3);
          //     return helper.response(
          //       response,
          //       200,
          //       "Top up success",
          //       result,
          //       result2,
          //       result3
          //     );
          //   } else {
          //     return helper.response(response, 400, "Invalid phone number");
          //   }
          // } catch (error) {
          //   return helper.response(response, 400, "Bad Request", error);
          // }
          // TODO set transaction status on your databaase to 'success'
          // [model 1] UPDATE STATUS KE DATABASE dengan status berhasil
          // const updateStatusResult = await modelUpdateStatusResult(orderId, transactionStatus)
          // response user_id, nominal topup
          // ====================
          // [model 2] cek nominal sebelumnya dan akan set parameter (user_id)
          // response nominal sebelum toup
          // ====================
          // saldoBaru = nominal sebelumnya + nominal topup
          // [model 3] UPDATE DATA SALDO SUPAYA SALDO USER BERTAMBAH (user_id, saldoBaru)
        } else if (transactionStatus == "deny") {
          // TODO you can ignore 'deny', because most of the time it allows payment retries
          // and later can become success
        } else if (
          transactionStatus == "cancel" ||
          transactionStatus == "expire"
        ) {
          // TODO set transaction status on your databaase to 'failure'
        } else if (transactionStatus == "pending") {
          // TODO set transaction status on your databaase to 'pending' / waiting payment
        }
      })
      .then(() => {
        return helper.response(response, 200, "OK");
      })
      .catch((error) => {
        return helper.response(response, 200, error);
      });
  },
};
