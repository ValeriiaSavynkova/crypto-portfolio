const { JsonDB, Config } = require( 'node-json-db');
const {
  db,
  user
} = require('../config/config.js');

const getDashboardHandler = async (req, res) => {
       
  let records = await db.getData(`/${user}/records`);
  //add api call to every combination separatelly to get updates
  //improvement to group currencies to reduce calls

  //add ability to show total in desired currency
  
  let headers = [];

  if (records.length > 0) {
    headers = Object.keys(records[0]);
  }

  res.render('pages/dashboard', { headers, records });
     
  }


module.exports = {
    getDashboardHandler,
};