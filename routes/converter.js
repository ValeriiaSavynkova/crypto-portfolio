const express = require('express');
const path = require('path');
const {
  getConvertHandler,
  postConvertHandler,
} = require(path.join(__dirname, '../controllers/converterController.js'));

const router = express.Router();

router.get('/', getConvertHandler);
router.post('/',  postConvertHandler);

module.exports = router;