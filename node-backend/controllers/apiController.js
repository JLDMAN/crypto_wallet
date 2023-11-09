const axios = require('axios'); // Import axios library
const API = require('../models/Api');

const apiController = {
  async storeData(req, res) {
    try {
      console.log("request made from controller")
      // Make an HTTP GET request to the external API
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&locale=en');

      // Assuming the API response is an array of data, you can access it like this:
      const apiData = response.data;

      // Now, you can process the API data and store it in your database using the API class
      const api = new API();
      const result = await api.storeAPIData(apiData);

      res.status(200).json({ message: 'API data stored', result });
    } catch (error) {
      console.error('Could not get API data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = apiController;