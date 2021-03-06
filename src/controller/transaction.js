const {
  getTransactionById,
  getIncomeTransactionTotal,
  getIncomeTransactionPerDay,
  getExpenseTransactionTotal,
  getExpenseTransactionPerDay,
  getTransact,
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
  getTransact: async (request, response) => {
    try {
      const { user_id, date_from, date_to } = request.body;
      const result = await getTransact(user_id, date_from, date_to);
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
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
