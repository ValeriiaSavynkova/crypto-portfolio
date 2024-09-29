const express = require('express');
const path = require('path');
const {
    getSupportedPhCurrencies,
    getSupportedCryptoCurrencies,
  } = require(path.join(__dirname, '../controllers/supportController.js'));

const router = express.Router();

router.get('/', getSupportedPhCurrencies);
router.get('/crypto', getSupportedCryptoCurrencies);

module.exports = router;
