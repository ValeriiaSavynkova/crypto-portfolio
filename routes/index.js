const express = require('express');
const path = require('path');
const rootRouter = require(path.join(__dirname, './root.js'));
const converterRouter = require(path.join(__dirname, './converter.js'));
const supportRouter = require(path.join(__dirname, './support.js'));
const recordsRouter = require(path.join(__dirname, './records.js'));
const dashboardRouter = require(path.join(__dirname, './dashboard.js'));
const myPortfolioRouter = require(path.join(__dirname, './myPortfolio.js'));
const rateRouter = require(path.join(__dirname, './setPricePerCoin.js'));
const router = express.Router();

router.use('/api/convert', converterRouter);
router.use('/api/supported', supportRouter);
router.use('/api/records', recordsRouter);
router.use('/dashboard', dashboardRouter);
router.use('/my-portfolio', myPortfolioRouter);
router.use('/rate', rateRouter);
router.use('/', rootRouter);

module.exports = router;