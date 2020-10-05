const router = require("express").Router();
const {
  postPayment,
  postMidtransNotif,
  getTopupData,
} = require("../controller/payment");

router.post("/", postPayment);
router.post("/midtrans-notif", postMidtransNotif);
router.post("/topupdata", getTopupData);

module.exports = router;
