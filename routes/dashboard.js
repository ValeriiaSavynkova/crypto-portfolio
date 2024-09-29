const express = require('express');
const path = require('path');
const {
  getDashboardHandler,
  } = require(path.join(__dirname, '../controllers/dashboardController.js'));

const router = express.Router();

router.get('/', getDashboardHandler);

module.exports = router;