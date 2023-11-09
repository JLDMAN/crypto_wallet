const { Pool } = require('pg');
const pool = require('../config/database');

class API {
  async storeAPIData(apiData) {
    try {
      console.log("request made from class")
      // Loop through the API data and insert it into your database
      for (const data of apiData) {
        const storeAPIDataQuery = `
          INSERT INTO api_info (coin_id, image_url, current_price, market_cap_change_percentage_24h, market_cap, total_volume)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;

        await pool.query(storeAPIDataQuery, [
          data.id,
          data.image,
          data.current_price,
          data.market_cap_change_percentage_24h,
          data.market_cap,
          data.total_volume,
        ]);
      }

      return 'API data stored successfully';
    } catch (error) {
      console.error('Error storing API data:', error);
      throw error;
    }
  }
}

module.exports = API;