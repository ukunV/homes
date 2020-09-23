const payTypes = document.querySelectorAll('input.checkPayMonth');

payTypes.forEach((payType) => payType.addEventListener('change', togglePayDay));

function togglePayDay(e) {
  const roomNum = e.target.getAttribute('room-num');
  const target = document.querySelector(`div[payday-room-num='${roomNum}']`);
  if (e.target.value === '0') {
    target.style.display = 'block';
  } else {
    target.style.display = 'none';
  }
}

payTypes.forEach((payType) => {
  if (payType.value === '0') {
    const roomNum = payType.getAttribute('room-num');
    const target = document.querySelector(`div[payday-room-num='${roomNum}']`);
    const dayTarget = document.querySelector(`div[payday-room-num='${roomNum}']>input`);
    if (payType.checked) {
      target.style.display = 'block';
    } else {
      target.style.display = 'none';
      dayTarget.value = 0;
    }
  }
});

const deleteTenant = document.querySelectorAll('input.delete-tenant-check');

deleteTenant.forEach((payType) => payType.addEventListener('click', deleteTenantName));

function deleteTenantName(e) {
  const roomNum = e.target.getAttribute('room-num');
  const target = document.querySelector(`form[name='tenant_${roomNum}'] input[name='tenantID']`);
  if (e.target.checked) {
    target.value = '세입자 없음';
    target.setAttribute('disabled', 'true');
  } else {
    const original_tid = e.target.getAttribute('original-tid');
    target.removeAttribute('disabled');
    target.value = original_tid;
  }
}
