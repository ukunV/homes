const setapp = document.querySelector('.navbar-setapp');
const menu = document.querySelector('.set-menu');

setapp.addEventListener('click', () => menu.classList.toggle('active'));

document.querySelector('.set-logout').addEventListener('click', () => {
  location.href = '/process/logout';
});

// add_floor() on mgmt_register.html
let cur_cnt = 1;
function add_floor() {
  cur_cnt++;
  let floor_list = document.getElementById('floor_list');

  floor_list.innerHTML +=
    "<div class='cur-floor'><div class='room-floor'>" +
    cur_cnt +
    "층</div><div class='room-count'><input class='room-num' type='number' min='1' max='999' step='1' /></div></div>";
}
