const express = require('express');
const path = require('path');
const {
  getPortfolioHandler,
  postPortfolioHandler
  } = require(path.join(__dirname, '../controllers/myPortfolioController.js'));

const router = express.Router();

router.get('/', getPortfolioHandler);
router.post('/', postPortfolioHandler)
module.exports = router;