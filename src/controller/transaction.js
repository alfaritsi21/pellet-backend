const {
  getTransactionById,
  getIncomeTransactionTotal,
  getIncomeTransactionPerDay,
  getExpenseTransactionTotal,
  getExpenseTransactionPerDay,
} = require("../model/transaction");
const fs = require("fs");
const helper = require("../helper/index");
const qs = require("querystring");

module.exports = {
  getTransactionUser: async (request, response) => {
    try {
      const { user_id, target_id, date_from, date_to } = request.body;
      const result = await getTransactionById(
        user_id,
        target_id,
        date_from,
        date_to
      );
      console.log(result);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Transaction",
          result
        );
      } else {
        return helper.response(response, 404, `Transaction Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getIncomeTotal: async (request, response) => {
    try {
      const { date, user } = request.body;
      const result = await getIncomeTransactionTotal(date, user);
      console.log(result);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Income Total",
          result
        );
      } else {
        return helper.response(response, 404, `Income doesn't exist`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getIncomePerDay: async (request, response) => {
    try {
      const { date, user } = request.body;
      const result = await getIncomeTransactionPerDay(date, user);
      console.log(result);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Income Per Day",
          result
        );
      } else {
        return helper.response(response, 404, `Income doesn't exist`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getExpenseTotal: async (request, response) => {
    try {
      const { date, user } = request.body;
      const result = await getExpenseTransactionTotal(date, user);
      console.log(result);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Expense Total",
          result
        );
      } else {
        return helper.response(response, 404, `Expense doesn't exist`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getExpensePerDay: async (request, response) => {
    try {
      const { date, user } = request.body;
      const result = await getExpenseTransactionPerDay(date, user);
      console.log(result);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Expense Per Day",
          result
        );
      } else {
        return helper.response(response, 404, `Expense doesn't exist`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
