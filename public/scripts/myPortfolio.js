document.getElementById('mainTable').addEventListener('click', function (e) {
  if (e.target.closest('tr')) {
    const row = e.target.closest('tr');
    const id = row.getAttribute('data-id');
    if (id) {
      const subrecords = document.getElementById('subrecords-' + id);
      if (subrecords) {
        subrecords.style.display =
          subrecords.style.display === 'none' ? 'table-row' : 'none';
      }
    }
  }
});

let from = document.getElementById('from-currency-choice').value;
let to = document.getElementById('to-currency-choice').value;
let date = document.getElementById('datePicker').value;

const validateInput = (input) => {
  const regex = /^\d+(\.\d{1,8})?$/;
  if (!regex.test(input.value)) {
    input.setCustomValidity(
      'Please enter a number with up to 8 decimal places.'
    );
  } else {
    input.setCustomValidity('');
  }
};

const updateTotal = () => {
  const quantity = document.getElementById('quantity').value;
  const rate = document.getElementById('rate').value;
  if (quantity !== '' || rate !== '') {
    document.getElementById('total').value = (quantity * rate).toFixed(8);
  }
};

const updateQuantity = () => {
  const total = document.getElementById('total').value;
  const rate = document.getElementById('rate').value;
  if (rate !== '0') {
    document.getElementById('quantity').value = (total / rate).toFixed(8);
  }
};

const setPricePerCoin = async () => {
  console.log(from, to, date);
  const response = await fetch('/rate', {
    method: 'POST',
    body: JSON.stringify({ from, to, date }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log(data);
  console.log(
    document.getElementById('quantity').value,
    document.getElementById('total').value
  );
  document.getElementById('rate').value = data.rate;
  document.getElementById('rate-to-usd').value = data['Rate-to-USD'] || 0;
  updateQuantity();
};

document
  .getElementById('from-currency-choice')
  .addEventListener('input', async (e) => {
    from = e.target.value;
    console.log(from);
    if (from && to) {
      await setPricePerCoin();
    }
  });
document
  .getElementById('to-currency-choice')
  .addEventListener('input', async (e) => {
    to = e.target.value;
    console.log(to);
    if (from && to) {
      await setPricePerCoin();
    }
  });

document.getElementById('quantity').addEventListener('input', updateTotal);

document.getElementById('total').addEventListener('input', updateQuantity);

document.getElementById('rate').addEventListener('input', updateQuantity);

document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener('input', function () {
    validateInput(this);
  });
});

document
  .getElementById('datePicker')
  .addEventListener('input', setPricePerCoin);

const openFormBtn = document.getElementById('openFormBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');
const contentWrapper = document.querySelector('.content-wrapper');

openFormBtn.addEventListener('click', function () {
  modal.style.display = 'block';
  overlay.style.display = 'block';
  contentWrapper.classList.add('blur');
});

// Функция для закрытия модального окна и сброса формы
function closeModalAndResetForm() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
  contentWrapper.classList.remove('blur');
  transactionForm.reset(); // Сбрасываем все данные в форме
}

// Закрытие модального окна при нажатии на "Cancel"
closeModal.addEventListener('click', function () {
  closeModalAndResetForm();
});

// Закрытие модального окна при клике на overlay
overlay.addEventListener('click', function () {
  closeModalAndResetForm();
});

// Предотвращаем закрытие модального окна при клике внутри него
modal.addEventListener('click', function (event) {
  event.stopPropagation();
});
