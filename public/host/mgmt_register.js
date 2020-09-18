const floor_list = document.getElementById('floor_list');

// add floor on mgmt_register.html
let cur_cnt = 1;
function add_floor(e) {
  e.preventDefault();
  floor_list.innerHTML += `<div class='cur-floor' value='${++cur_cnt}'><div class='room-floor'>${cur_cnt}층</div><div class='room-count'><input class='room-num' name='${cur_cnt}floor' type='number' min='1' max='99' step='1' /></div></div>`;
}
const floorAddButton = document.querySelector('#add_bt');
floorAddButton.addEventListener('click', add_floor);

// delete floor on mgmt_register.html
function delete_floor(e) {
  e.preventDefault();
  if (cur_cnt > 1) {
    let lastTarget = floor_list.querySelector(`div[value = "${cur_cnt--}"]`);
    floor_list.removeChild(lastTarget);
  }
}
const floorDeleteButton = document.querySelector('#del_bt');
floorDeleteButton.addEventListener('click', delete_floor);
