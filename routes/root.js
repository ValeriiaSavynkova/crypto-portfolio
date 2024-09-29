const express = require('express');
const path = require('path');
const { getRootHandler } = require(path.join(__dirname, '../controllers/rootController.js'));

const router = express.Router();

router.get('/', getRootHandler);

module.exports = router;