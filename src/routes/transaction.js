const router = require("express").Router();
const {
  getTransactionUser,
  getIncomeTotal,
  getIncomePerDay,
  getExpenseTotal,
  getExpensePerDay,
} = require("../controller/transaction");

router.get("/", getTransactionUser);
router.get("/income", getIncomeTotal);
router.get("/income/day", getIncomePerDay);
router.get("/expense", getExpenseTotal);
router.get("/expense/day", getExpensePerDay);

module.exports = router;
