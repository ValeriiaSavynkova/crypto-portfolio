// function postTransaction() {
//   const amount = document.getElementById('amount').value;
//    const fromCurrencyChoice = document.getElementById('from-currency-choice').value;
//    const toCurrencyChoice = document.getElementById('to-currency-choice').value;
//     const date = document.getElementById('datePicker').value;
//     console.log(amount, fromCurrencyChoice, toCurrencyChoice, date)
//     fetch('/my-portfolio', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             amount: amount,
//             from: fromCurrencyChoice,
//             to: toCurrencyChoice,
//             date: date,
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
     
//         document.getElementById('amount').value = '';
//         document.getElementById('from-currency-choice').value = '';
//         document.getElementById('to-currency-choice').value = ''
//         document.getElementById('datePicker').value = '';
//         console.log(data)
        
//         })
//     .catch(error => console.error('Error:', error));
// }