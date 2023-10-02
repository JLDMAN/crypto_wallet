const Transactions = require("../models/Transactions");

const transactionController = {
  async checkBalances(req, res) {
    const { user, email } = req.body;

    try {
      const id = await Transactions.findId(user, email);

      if (!id) {
        return res.status(400).json({ error: "No user id matches" });
      } else {
        const totals = await Transactions.checkTotals(id.user_id);

        // Respond with the user transaction data including all rows
        res.status(201).json({
          message: "User transaction totals found",
          status: "success",
          transactions: {
            totals: totals, // Include all rows in the response
          },
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async tradePairs(req, res) {
    const { user, email, buyCoin, howmuchCanBuy, sellCoin, sellCoinAmount } = req.body;

    try {
      const id = await Transactions.findId(user, email);

      if (!id) {
        return res.status(400).json({ error: "No user id matches" });
      } else {
        const swap = await Transactions.performSwap(id.user_id, buyCoin, howmuchCanBuy, sellCoin, sellCoinAmount);

        res.status(201).json({
          message: "User transactions executed",
          status: swap,
        });
      }
    } catch (error) {
      console.error("Error performing swap:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = transactionController;
