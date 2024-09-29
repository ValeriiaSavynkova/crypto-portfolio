const { JsonDB, Config } = require('node-json-db');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment-timezone');
const currencySymbolMap = require('currency-symbol-map');

const { db, user } = require('../config/config.js');

const {
  allCurrenciesKeys,
  allCurrencies,
} = require('../config/currencies2.js');

const base_url = 'https://api.coinlayer.com/';
const access_key = '1d8964c0fbafa9b123ee37053f1fcc30';

// it doesn't work
// const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone // UTC, but I need 'Europe/Prague'

const userTimeZone = 'Europe/Prague';

const today = moment().tz(userTimeZone).format('YYYY-MM-DDTHH:mm');

const getPortfolioHandler = async (req, res) => {
  let transactions = await db.getData(`/${user}/transactions`);

  // const headersOfMainTable = ['Name', 'Current price per coin', '24H', 'Holdings', 'Avg.Buy Price', 'Profit/Loss'];
  const headersOfMainTable = [
    'Name',
    'Current price per coin',
    'Holdings',
    'Avg.Buy Price ($)',
  ];
  const headersOfSubTable = ['Date', 'From', 'Price', 'Amount', 'Total'];

  let records = Array.from(new Set(transactions.map((t) => t.To))).map((e) => {
    return { name: e };
  });

  records = records.map((record) => {
    record.currentPrice = '';
    record.holdings = [
      transactions
        .reduce((acc, t) => {
          if (t.To === record.name) {
            acc += t.Amount / t.Rate;
          }
          return acc;
        }, 0)
        .toFixed(8),
    ];

    record.avgBuyPrice = (
      transactions.reduce((acc, t) => {
        if (t.To === record.name) {
          acc += t.Amount / t['Rate-to-USD'];
        }
        return acc;
      }, 0) /
      transactions.reduce((acc, t) => {
        if (t.To === record.name) {
          acc += t.Amount / t.Rate;
        }
        return acc;
      }, 0)
    ).toFixed(2);

    return record;
  });

  const response = await fetch(`${base_url}live?access_key=${access_key}`);
  const data = await response.json();
  records.forEach((record) => {
    record.holdings.push(
      (record.holdings[0] * data.rates[record.name]).toFixed(2)
    );
    record.currentPrice = data.rates[record.name].toFixed(2);
    db.push(
      `/${user}/historical/${record.name}`,
      [
        {
          Date: moment(data.timestamp)
            .tz(userTimeZone)
            .format('YYYY-MM-DDTHH:mm'),
          Rate: data.rates[record.name],
        },
      ],
      false
    );
  });

  console.log(records);
  let subrecords = {};

  transactions.forEach((t) => {
    if (!subrecords[t.To]) {
      subrecords[t.To] = [];
    }
    subrecords[t.To].push({
      Date: new Date(t.Date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      From: t.From,
      Price: t.Rate.toFixed(2),
      Amount: (t.Amount / t.Rate).toFixed(8),
      Total: [
        [t.Amount, currencySymbolMap(t.From)],
        (t.Amount / t['Rate-to-USD']).toFixed(2),
      ],
    });
  });

  res.render('pages/myPortfolio', {
    headersOfMainTable,
    records,
    headersOfSubTable,
    subrecords,
    allCurrenciesKeys,
    allCurrencies,
    today,
  });
};

const postPortfolioHandler = async (req, res) => {
  let { from, to, rate, 'rate-to-usd': rateToUsd, total, date } = req.body;

  let transaction = {
    Amount: Number(total),
    From: from,
    To: to,
    Rate: Number(rate),
    'Rate-to-USD': Number(rateToUsd),
    Date: date,
  };
  db.push(`/${user}/transactions`, [transaction], false);
  res.redirect('/my-portfolio');
};

const getPricePerCoinHandler = async (req, res) => {
  console.log('getPricePerCoinHandler');
  let { from, to, date } = req.body;
  console.log(from, to, date.split('T')[0], today.split('T')[0]);
  if (allCurrenciesKeys.includes(from) && allCurrenciesKeys.includes(to)) {
    if (date.split('T')[0] === today.split('T')[0]) {
      const response = await fetch(
        `${base_url}live?access_key=${access_key}&target=${from}`
      );
      const data = await response.json();
      console.log('data', data.rates[to]);
      res.json({ rate: data.rates[to], 'Rate-to-USD': data.rates['USDT'] });
    } else {
      const response = await fetch(
        `${base_url}${
          date.split('T')[0]
        }?target=${from}&access_key=${access_key}`
      );
      const data = await response.json();
      console.log('data', data.rates[to]);
      res.json({ rate: data.rates[to], 'Rate-to-USD': data.rates['USDT'] });
    }
  } else {
    res.json({ rate: 0 });
  }
};

module.exports = {
  getPortfolioHandler,
  postPortfolioHandler,
  getPricePerCoinHandler,
};
