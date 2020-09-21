const payTypes = document.querySelectorAll('input.checkPayMonth');

payTypes.forEach((payType) => payType.addEventListener('change', togglePayDay));

function togglePayDay(e) {
  const roomNum = e.target.getAttribute('room-num');
  const form = document.querySelector(`form[name='payment-month-day-each_${roomNum}']`);
  if (e.target.value === '0') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
}

payTypes.forEach((payType) => {
  if (payType.value === '0') {
    const roomNum = payType.getAttribute('room-num');
    const form = document.querySelector(`form[name='payment-month-day-each_${roomNum}']`);
    if (payType.checked) {
      form.style.display = 'block';
    } else {
      form.style.display = 'none';
    }
  }
});
