const router = require("express").Router();
const { postTopup } = require("../controller/topup");

router.post("/", postTopup);

module.exports = router;
