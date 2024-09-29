const express = require('express');
const path = require('path');
const {
  getPricePerCoinHandler,
} = require(path.join(__dirname, '../controllers/myPortfolioController.js'));

const router = express.Router();

router.post('/', getPricePerCoinHandler);

module.exports = router;