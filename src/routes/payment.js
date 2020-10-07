const router = require("express").Router();
const {
  postPayment,
  postMidtransNotif,
  getTopupData,
  getUserData,
  getTransactionData,
  postTopupMidtrans,
} = require("../controller/payment");

router.post("/", postPayment);
router.post("/topup", postTopupMidtrans);

router.post("/midtrans-notif", postMidtransNotif);
router.post("/topupdata", getTopupData);
router.post("/userdata", getUserData);
router.post("/transactiondata", getTransactionData);

module.exports = router;
