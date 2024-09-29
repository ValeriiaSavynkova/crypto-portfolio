function getConvert() {
             const amount = document.getElementById('amount').value;
             const fromCurrencyChoice = document.getElementById('from-currency-choice').value;
             const toCurrencyChoice = document.getElementById('to-currency-choice').value;
                 fetch('/api/convert', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                         amount: amount,
                         from: fromCurrencyChoice,
                         to: toCurrencyChoice
                     })
                 })
                 .then(response => response.json())
                 .then(data => {
                     document.getElementById('result').innerText = data.result;
                 })
                 .catch(error => console.error('Error:', error));
             }

