const connection = require("../config/mysql");

module.exports = {
  getTransactionById: (user, target, date_from, date_to) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM transaction LEFT JOIN user ON transaction.target_id = user.user_id  WHERE transaction.user_id = ${user} OR transaction.user_id = ${user} AND created_at >= "${date_from}" AND created_at <= "${date_to}" ORDER BY created_at ASC`,
        // `SELECT * FROM transaction LEFT JOIN user ON transaction.user_id = user.user_id  WHERE ((transaction.user_id = ${user} AND target_id = ${target}) OR (transaction.user_id = ${target} AND target_id = ${user})) AND (created_at >= "${date_from}" AND created_at <= "${date_to}") ORDER BY created_at ASC`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getIncomeTransactionTotal: (date, user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(trans_nominal) as income, DATE(created_at) as date FROM transaction WHERE DATE(created_at) > "${date}" AND target_id = ${user}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getIncomeTransactionPerDay: (date, user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(trans_nominal) as income, DATE(created_at) as date FROM transaction WHERE DATE(created_at) > "${date}" AND target_id = ${user} GROUP BY DATE(created_at)`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getExpenseTransactionTotal: (date, user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(trans_nominal) as expense, DATE(created_at) as date FROM transaction WHERE DATE(created_at) > "${date}" AND user_id = ${user}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getExpenseTransactionPerDay: (date, user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(trans_nominal) as expense, DATE(created_at) as date FROM transaction WHERE DATE(created_at) > "${date}" AND user_id = ${user} GROUP BY DATE(created_at)`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getTransact: (id, date_from, date_to) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM transaction LEFT JOIN user ON IF(transaction.user_id = ${id}, transaction.target_id = user.user_id, transaction.user_id = user.user_id ) WHERE transaction.user_id = ${id} || transaction.target_id = ${id} AND created_at >= "${date_from}" AND created_at <= "${date_to}" ORDER BY created_at ASC`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
