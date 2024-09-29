const express = require('express');
const path = require('path');
const {
  getAddRecord,
  postRecordHandler,
} = require(path.join(__dirname, '../controllers/recordsController.js'));

const router = express.Router();

router.get('/', getAddRecord);
router.post('/', postRecordHandler);

module.exports = router;