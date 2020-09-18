const setapp = document.querySelector('.navbar-setapp');
const menu = document.querySelector('.set-menu');

setapp.addEventListener('click', () => menu.classList.toggle('active'));

document.querySelector('.set-logout').addEventListener('click', () => {
  location.href = '/process/logout';
});

const floor_list = document.getElementById('floor_list');
// add_floor() on mgmt_register.html
let cur_cnt = 1;
function add_floor(e) {
  e.preventDefault();
  floor_list.innerHTML += `<div class='cur-floor' value='${++cur_cnt}'><div class='room-floor'>${cur_cnt}층</div><div class='room-count'><input class='room-num' type='number' min='1' max='999' step='1' /></div></div>`;
}
const floorAddButton = document.querySelector('#add_bt');
floorAddButton.addEventListener('click', add_floor);

function delete_floor(e) {
  e.preventDefault();
  if (cur_cnt > 1) {
    let lastTarget = floor_list.querySelector(`div[value = "${cur_cnt--}"]`);
    floor_list.removeChild(lastTarget);
  }
}
const floorDeleteButton = document.querySelector('#del_bt');
floorDeleteButton.addEventListener('click', delete_floor);
