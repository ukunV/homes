const memoOpenButtons = document.querySelectorAll('button.memo-toggle');

memoOpenButtons.forEach((bt) => bt.addEventListener('click', memoToggle));

function memoToggle(e) {
  e.preventDefault();
  const roomNum = e.target.getAttribute('room-num');
  const target = document.querySelector(`div.room-memo-wrapper[room-num='${roomNum}']`);

  if (target.style.display != 'none') {
    target.style.display = 'none';
    e.target.innerHTML = '메모 추가';
  } else {
    target.style.display = 'flex';
    e.target.innerHTML = '메모 접기';
  }
}
