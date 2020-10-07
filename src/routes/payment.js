const router = require("express").Router();
const {
  postPayment,
  postMidtransNotif,
  getTopupData,
  getUserData,
  getTransactionData,
  postTopupMidtrans,
  postTopupMidtransDummy,
  cekCode,
} = require("../controller/payment");

router.post("/", postPayment);
router.post("/topupmidtrans", postTopupMidtrans);
router.post("/topupdummy", postTopupMidtransDummy);
router.post("/cekcode", cekCode);

router.post("/midtrans-notif", postMidtransNotif);
router.post("/topupdata", getTopupData);
router.post("/userdata", getUserData);
router.post("/transactiondata", getTransactionData);

module.exports = router;
