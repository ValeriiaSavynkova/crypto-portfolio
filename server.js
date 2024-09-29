const express = require('express');
const app = express();
const router = require('./routes/index.js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const path = require('path');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
}) 






// const path = require('path');
// const url = require('url');
// const cron = require('cron');
// const { JsonDB, Config } = require( 'node-json-db');
// const { JsonDB, Config } = require( 'node-json-db');
// const db = new JsonDB(new Config("myDataBase", true, true, '/'));

// const db = new JsonDB(new Config("myDataBase", true, true, '/'));
// https://www.npmjs.com/package/node-json-db


// let physicalCurrenciesKeys = []
// let cryptoCurrenciesKeys = []

// let physicalCurrencies = {}
// let cryptoCurrencies = {}


// const apikey = process.env.API_KEY;
// const baseurl = `${process.env.BASE_URL}fetch-one?api_key=${apikey}`;
// const urlOfPhysicalCurrencies = `${process.env.BASE_URL}currencies?api_key=${apikey}`;
// const urlOfCryptoCurrencies = `${process.env.BASE_URL}crypto/currencies?api_key=${apikey}`;

// let user = 'Valeriia';


// //https://fastforex.readme.io/reference/introduction

// // const job = new cron.CronJob(
// //   '0 0 0 * * *', // cronTime
// //   function () {
  //   Promise.all([
  //     fetch(urlOfPhysicalCurrencies)
  //     .then((data) => data.json()),
  //     fetch(urlOfCryptoCurrencies)
  //     .then((data) => data.json())
  //   ])
  //   .then(([a, b])=>{
  //     physicalCurrencies = a.currencies
  //     cryptoCurrencies = b.currencies
  //     physicalCurrenciesKeys = Object.keys(a.currencies);
  //     cryptoCurrenciesKeys = Object.keys(b.currencies);
  //      })
  //   .catch((error) => {
  // console.error('Error:', error);
  //   // if (!res.headersSent) {        
  //   //   res.status(503).send('Sorry, the external currency API is currently unavailable. Please try again later.'); 
  //   })


//   }, // onTick
//   null, // onComplete
//   true, // start
//   'America/Los_Angeles' // timeZone
// );


// Render Html File

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'templates/index.html'));
// });

// app.get('/api/supported', function(req,res){
//   let list = ''
//   for(let key in physicalCurrencies){
//     list += `<option value="${key}">${physicalCurrencies[key]}</option>`
//   }
//   let html = `
//   <label>Choose a currency:</label>
//   <input list="currencies" id="currency-choice" name="currency-choice" />

//   <datalist id="currencies">
//     ${list}
//   </datalist>
//   `
//   res.setHeader("Content-Type", "text/html")
//   res.send(html)
// })

// app.get('/api/supported/crypto', function(req,res){
//   let list = ''
//   for(let key in cryptoCurrencies){
//     list += `<option value="${key}">${cryptoCurrencies[key]}</option>`
//   }
//   let html = `
//   <label>Choose a cryptocurrency:</label>
//   <input list="cryptoCurrencies" id="crypto-currency-choice" name="crypto-currency-choice" />

//   <datalist id="cryptoCurrencies">
//     ${list}
//   </datalist>
//   `
//   res.setHeader("Content-Type", "text/html")
//   res.send(html)
// })

// app.get('/api/convert', (req, res) => {
//     let listOfCrypto = ''
//     for(let key in cryptoCurrencies){
//       listOfCrypto += `<option value="${key}">${cryptoCurrencies[key]}</option>`
//     }
  
//     let listOfCurrencies = ''
//       for(let key in physicalCurrencies){
//         listOfCurrencies += `<option value="${key}">${physicalCurrencies[key]}</option>`
//       }
  
//   let html = `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Currency Converter</title>
//     </head>
//     <body>
//         <label>Amount:</label>
//         <input type="text" name="Amount" id="amount" />
//         <label>From:</label>
//         <input list="cryptoCurrencies" id="crypto-currency-choice" name="crypto-currency-choice" />
//         <datalist id="cryptoCurrencies">
//             ${listOfCrypto}
//         </datalist>
//         <label>To:</label>
//         <input list="currencies" id="currency-choice" name="currency-choice" />
//         <datalist id="currencies">
//             ${listOfCurrencies}
//         </datalist>
//         <div>
//             <button onclick="getConvert()">Convert</button>
//         </div>
//         <p id="result"></p>
//         <script>
//         function getConvert() {
//             const amount = document.getElementById('amount').value;
//             const currencyChoice = document.getElementById('currency-choice').value;
//             const cryptoCurrencyChoice = document.getElementById('crypto-currency-choice').value;
//             console.log(amount, currencyChoice, cryptoCurrencyChoice)
//                 fetch('/api/convert', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         amount: amount,
//                         from: cryptoCurrencyChoice,
//                         to: currencyChoice
//                     })
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     document.getElementById('result').innerText = data.result;
//                 })
//                 .catch(error => console.error('Error:', error));
//             }
//         </script>
//     </body>
//     </html>
//     `

//       res.setHeader("Content-Type", "text/html")
//       res.send(html)
  

// })


// app.post('/api/convert', express.json(), (req, res) => {
//   let { amount, from, to } = req.body
//   fetch(`${baseurl}&from=${from}&to=${to}`)
//   .then((data) => data.json())
//   .then((data) => {
//     amount = amount === undefined ? undefined : amount.trim().split(' ').join('').replace(',', '.')

//     if (isNaN(amount)) {
//           res.json({ result: '"Amount" must be a number.'});
//           throw new Error( '"Amount" must be a number.')
//          }
//     if (!cryptoCurrenciesKeys.includes(from.toUpperCase())) {
//         res.json({ result: '"From" must be a cryptocurrency.' });
//       throw new Error('"From" must be a cryptocurrency.')
//       }
//       if (!physicalCurrenciesKeys.includes(to.toUpperCase())) {
//         res.json( { result: '"To" must be a physical currency.'});
//       throw new Error('"To" must be a physical currency.')
//       }
//   const result = data.result[to] * amount;
//   res.json({ result: `${amount} ${from} will be ${result.toFixed(2)} ${to}` });
// })
// .catch(error => {
//   console.error('Error:', error);
//   if (!res.headersSent) {
//          res.status(503).send('Sorry, the external currency API is currently unavailable. Please try again later.'); 
//   }
//   });
// })

// app.get('/dashboard', async (req, res) => {
//     let listOfCrypto = ''
//     for(let key in cryptoCurrencies){
//       listOfCrypto += `<option value="${key}">${cryptoCurrencies[key]}</option>`
//     }

//     let listOfCurrencies = ''
//       for(let key in physicalCurrencies){
//         listOfCurrencies += `<option value="${key}">${physicalCurrencies[key]}</option>`
//       }

//   let records = await db.getData(`/${user}/records`);
//   console.log(records)
//   let trs=''
//   let ths = ''
//   for(let i = 0; i< records.length; i++){
//     let tds=''
//     for(let key in records[i]){
//       tds += `<td>${records[i][key]}</td>`
//       ths += `<th>${key}</th>`
//     }
//     trs+= `<tr>${tds}</tr>`
//   }
//   let table = `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`

//   let html = `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Currency Converter</title>
//     </head>
//     <body>
//         <label>Amount:</label>
//         <input type="text" name="Amount" id="amount" />
//         <label>From:</label>
//         <input list="cryptoCurrencies" id="crypto-currency-choice" name="crypto-currency-choice" />
//         <datalist id="cryptoCurrencies">
//             ${listOfCrypto}
//         </datalist>
//         <label>To:</label>
//         <input list="currencies" id="currency-choice" name="currency-choice" />
//         <datalist id="currencies">
//             ${listOfCurrencies}
//         </datalist>
//         <div>
//             <button onclick="getConvert()">add</button>
//         </div>
//         <p id="result"></p>
//           ${table}
//         <script>
//         function getConvert() {
//             const amount = document.getElementById('amount').value;
//             const currencyChoice = document.getElementById('currency-choice').value;
//             const cryptoCurrencyChoice = document.getElementById('crypto-currency-choice').value;
//             console.log(amount, currencyChoice, cryptoCurrencyChoice)
//                 fetch('/API/records', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         amount: amount,
//                         from: cryptoCurrencyChoice,
//                         to: currencyChoice
//                     })
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     document.getElementById('result').innerText = data.result;
//                 })
//                 .catch(error => console.error('Error:', error));
//             }
//         </script>
//     </body>
//     </html>
//     `

//       res.setHeader("Content-Type", "text/html")
//       res.send(html)


// })

// app.post('/api/records', (req,res)=>{
//     let { amount, from, to } = req.body
//     fetch(`${baseurl}&from=${from}&to=${to}`)
//     .then((data) => data.json())
//     .then((data) => {
//       amount = amount === undefined ? undefined : amount.trim().split(' ').join('').replace(',', '.')

//       if (isNaN(amount)) {
//             res.json({ result: '"Amount" must be a number.'});
//             throw new Error( '"Amount" must be a number.')
//            }
//       if (!cryptoCurrenciesKeys.includes(from.toUpperCase())) {
//           res.json({ result: '"From" must be a cryptocurrency.' });
//         throw new Error('"From" must be a cryptocurrency.')
//         }
//         if (!physicalCurrenciesKeys.includes(to.toUpperCase())) {
//           res.json( { result: '"To" must be a physical currency.'});
//         throw new Error('"To" must be a physical currency.')
//         }
//   db.push(`/${user}/records`, [{amount, from, to, rate:data.result[to]}], false);
//       const result = data.result[to] * amount;
//       res.json({ result: `${amount} ${from} will be ${result.toFixed(2)} ${to}` });
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     if (!res.headersSent) {
//            res.status(503).send('Sorry, the external currency API is currently unavailable. Please try again later.'); 
//     }
//     });
// })
// //todo
// // -endpoint to add new record to your account



