function postRecord() {
    const amount = document.getElementById('amount').value;
     const fromCurrencyChoice = document.getElementById('from-currency-choice').value;
     const toCurrencyChoice = document.getElementById('to-currency-choice').value;
      fetch('/API/records', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              amount: amount,
              from: fromCurrencyChoice,
              to: toCurrencyChoice,
              date: new Date().toLocaleString(),
          })
      })
      .then(response => response.json())
      .then(data => {
        if(!data.result) {
          let record = data;
          record['Total'] = (record['Amount'] * record['Rate']).toFixed(2);
          
          let tableBody = document.querySelector('#myDashboard tbody');

          let newRow = tableBody.insertRow();

          let cellsCount = 0;
          for (const key in record) {
              if (record.hasOwnProperty(key)) {
                  if (cellsCount < 6) {
                      newRow.insertCell().innerHTML = record[key];
                      cellsCount++;
                  } else {
                      break;
                  }
              }
          }       
            document.getElementById('result').innerText = 'The new record has been added to the dashboard.';
            
          } else {
              document.getElementById('result').innerText = data.result;
              
          } 
          document.getElementById('amount').value = '';
          document.getElementById('from-currency-choice').value = '';
          document.getElementById('to-currency-choice').value = '';
          })
      .catch(error => console.error('Error:', error));
  }