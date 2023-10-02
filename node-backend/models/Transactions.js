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
      d;
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
      }
    } catch (error) {
      console.error("Error finding transaction totals", error);
      throw error;
    }
  }

  static async performSwap(
    userId,
    buyCoin,
    howmuchCanBuy,
    sellCoin,
    sellCoinAmount
  ) {
    const buyCoinsQuery = `
      INSERT INTO transactions (user_id, coin_id, transaction, transaction_id)
      VALUES ($1, $2, $3, NOW() || ' SOLD');
    `;

    const sellCoinsQuery = `
    INSERT INTO transactions (user_id, coin_id, transaction, transaction_id)
     VALUES ($1, $2, 0-(($3::numeric)), NOW() || ' BUAGHT');
    `;

    try {
      const { rowCount: buyRowCount } = await pool.query(buyCoinsQuery, [userId, buyCoin, parseFloat(howmuchCanBuy)]);
      const { rowCount: sellRowCount } = await pool.query(sellCoinsQuery, [userId, sellCoin, parseFloat(sellCoinAmount)]);
      
      if (buyRowCount > 0 && sellRowCount > 0) {
        return "success";
      } else {
        return "failed";
      }
    } catch (error) {
      console.error("Error could not perform transaction", error);
      throw error;
    }
  }
}

module.exports = Transactions;
