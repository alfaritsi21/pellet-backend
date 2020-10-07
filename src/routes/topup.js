const router = require("express").Router();
const { postTopup, midtransTopup } = require("../controller/topup");

router.post("/", postTopup);
router.post("/midtrans", midtransTopup);

module.exports = router;
