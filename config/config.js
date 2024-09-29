const dotenv = require('dotenv');
const { JsonDB, Config } = require( 'node-json-db');
const db = new JsonDB(new Config("myDataBase", true, true, '/'));

dotenv.config();

const apikey = process.env.API_KEY;
const baseurl = `${process.env.BASE_URL}fetch-one?api_key=${apikey}`;
const urlOfPhysicalCurrencies = `${process.env.BASE_URL}currencies?api_key=${apikey}`;
const urlOfCryptoCurrencies = `${process.env.BASE_URL}crypto/currencies?api_key=${apikey}`;


let user = 'Valeriia';

module.exports = {
  apikey,
  baseurl,
  urlOfPhysicalCurrencies,
  urlOfCryptoCurrencies,
  db, 
  user,
};