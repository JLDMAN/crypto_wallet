const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const transactionsController = require('../controllers/transactionController');
const apiController = require('../controllers/apiController');
// middle ware
const verifyToken = require('../middleware/verifyToken')

// Route for user registration
router.post('/register', userController.register);
// Route for user login
router.post('/login', userController.login);
// Routes for user transactions
router.post('/checkBalances', transactionsController.checkBalances);
// Route for user transactions
router.post('/tradePairs', transactionsController.tradePairs);
// Route for API data
router.post('/storeAPIData', apiController.storeData);

// Protected routes
router.get('/getUserInfo', verifyToken, (req, res) => {
    // This route is protected and only accessible with a valid token
    res.status(200).json({ message: 'Protected resource accessed', user: req.user });
  });

module.exports = router;