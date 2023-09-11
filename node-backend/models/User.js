const { Pool } = require("pg");
const pool = require("../config/database"); // Adjust the path as needed

// Define the User model
class User {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdate TIMESTAMP DEFAULT current_timestamp
      )
    `;

    try {
      await pool.query(createTableQuery);
      console.log("User table created or already exists.");
    } catch (error) {
      console.error("Error creating User table:", error);
    }
  }

  static async findByEmail(email) {
    const findByEmailQuery = `
    SELECT * FROM users
    WHERE email = $1
    `;

    try {
      const { rows } = await pool.query(findByEmailQuery, [email]);
      // Check if any rows were returned
      if (rows.length === 0) {
        // User not found, return false
        return false;
      } else {
        console.log("User found:", rows[0]);
        // User found, return true
        return rows[0];
        return true;
      }
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  }

  static async addUser(firstName, lastName, email, password) {
    const addUserQuery = `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    try {
      const { rows } = await pool.query(addUserQuery, [
        firstName,
        lastName,
        email,
        password,
      ]);

      if (rows.length !== 0) {
        return rows[0];
      }

    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  static async initiateFunds(user){
    const initiateFundsQuery = `
    INSERT INTO transactions (user_id, coin_id, transaction, transaction_id)
    VALUES ($1, $2, $3, $4)
  `;

  //base coin
  const mmm = 'usd-coin'
  // transaction information
  const transactionKey = '_first_'
  const transactionId = `${user}${transactionKey}${mmm}`;
  const transaction=100000

  try {
    const { rows } = await pool.query(initiateFundsQuery, [
      user,
      mmm,
      transaction,
      transactionId,
    ]);
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
  }
}

module.exports = User;
