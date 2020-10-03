const router = require("express").Router();
const { addTansfer } = require("../controller/transfer");

router.post("/", addTansfer);

module.exports = router;
