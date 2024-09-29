const fetch = require('node-fetch');
const { baseurl } = require('../config/config.js');
const  {
        allCurrenciesKeys,
        physicalCurrenciesKeys,
        cryptoCurrenciesKeys,
        allCurrencies,
        physicalCurrencies,
        cryptoCurrencies,
    } = require('../config/currencies.js');

const getConvertHandler = (req, res) => {

  try {
    res.render('pages/convert', {
      pageTitle: 'Currency Converter',
      allCurrencies
      
    });
  } catch (error) {
    console.error('Error rendering convert page:', error);
    res.status(500).send('Internal Server Error');
  }


  }

const postConvertHandler = (req, res) => {
      let { amount, from, to } = req.body
      fetch(`${baseurl}&from=${from}&to=${to}`)
      .then((data) => data.json())
      .then((data) => {
        amount = amount === undefined ? undefined : amount.trim().split(' ').join('').replace(',', '.')
        from = from.toUpperCase();
        to = to.toUpperCase();

        if(amount.length === 0) {
          res.json({ result: '"Amount" field is empty.'});
          throw new Error('"Amount" field is empty.')
           }
        
        if (isNaN(amount)) {
              res.json({ result: '"Amount" must be a number.'});
              throw new Error( '"Amount" must be a number.')
             }
        if (!allCurrenciesKeys.includes(from)) {
            res.json({ result: '"From" must be either cryptocurrency or physical currency.' });
          throw new Error('"From" must be either cryptocurrency or physical currency.')
          }
          if (!allCurrenciesKeys.includes(to)) {
            res.json( { result: '"To" must be either cryptocurrency or physical currency.'});
          throw new Error('"To" must be either cryptocurrency or physical currency.')
          }
      const result = data.result[to] * amount;
      res.json({ result: `${amount} ${from} will be ${result.toFixed(2)} ${to}` });
    })
    .catch(error => {
      console.error('Error:', error);
      if (!res.headersSent) {
             res.status(503).send('Sorry, the external currency API is currently unavailable. Please try again later.'); 
      }
      });
    }

module.exports = {
    getConvertHandler,
    postConvertHandler,
};