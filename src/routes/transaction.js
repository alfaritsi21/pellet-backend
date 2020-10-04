const router = require("express").Router();
const {
  getTransactionUser,
  getIncomeTotal,
  getIncomePerDay,
  getExpenseTotal,
  getExpensePerDay,
} = require("../controller/transaction");

router.get("/", getTransactionUser);
router.post("/income", getIncomeTotal);
router.post("/income/day", getIncomePerDay);
router.post("/expense", getExpenseTotal);
router.post("/expense/day", getExpensePerDay);

module.exports = router;
