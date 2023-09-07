const { Pool } = require("pg");
const pool = require("../config/database");

class Transactions {
  static async findId(user, email) {
    const findUserQuery = `
    SELECT user_id
    FROM users 
    WHERE first_name = $1 AND email = $2
    `;

    try {
      const { rows } = await pool.query(findUserQuery, [user, email]);

      if (rows.length !== 0) {
        return rows[0];
        return true;
      }
    } catch (error) {
      console.error("Error finding user id", error);
      throw error;
    }
  }

  static async checkTotals(userId) {
    const checkTotalsQuery = `
        SELECT user_id, coin_id, SUM(transaction) AS net_transactions
        FROM transactions
        WHERE user_id = $1
        GROUP BY user_id, coin_id
        ORDER BY net_transactions DESC
      `;

    try {
      const { rows } = await pool.query(checkTotalsQuery, [userId]);

      if (rows.length !== 0) {
        return rows;
        return true;
      }
    } catch (error) {
      console.error("Error finding transaction totals", error);
      throw error;
    }
  }
}

module.exports = Transactions;
