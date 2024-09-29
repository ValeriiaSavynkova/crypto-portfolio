const {
  physicalCurrencies,
  cryptoCurrencies,
} = require('../config/currencies.js');

const getSupportedPhCurrencies = (req,res) => {

  try {
    if(req.originalUrl === '/api/supported') {
    res.render('pages/support', {
      pageTitle: 'Supported Currencies',
      physicalCurrencies

    });
    }
  } catch (error) {
    console.error('Error rendering convert page:', error);
    res.status(500).send('Internal Server Error');
  }
    
  }

const getSupportedCryptoCurrencies = (req,res) => {
  try {
    if(req.originalUrl === '/api/supported/crypto') {
    res.render('pages/support', {
      pageTitle: 'Supported Crypto Currencies',
      cryptoCurrencies
    });
    }
  } catch (error) {
    console.error('Error rendering convert page:', error);
    res.status(500).send('Internal Server Error');
  }
  
  }

module.exports = {
  getSupportedPhCurrencies,
  getSupportedCryptoCurrencies,
}