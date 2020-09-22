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

const deleteTenant = document.querySelectorAll('input.delete-tenant-check');

deleteTenant.forEach((payType) => payType.addEventListener('click', deleteTenantName));

function deleteTenantName(e) {
  const roomNum = e.target.getAttribute('room-num');
  const target = document.querySelector(`form[name='tenant_${roomNum}']>.tenant`);
  if (e.target.checked) {
    target.value = '세입자 없음';
    target.setAttribute('disabled', 'true');
  } else {
    const original_tid = e.target.getAttribute('original-tid');
    target.removeAttribute('disabled');
    target.value = original_tid;
  }
}
