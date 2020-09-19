const floor_list = document.getElementById('floor_list');
const floor_count = document.getElementById('floor_count_hidden');
const isNoManager = document.getElementById('isNoManager_checkbox');

// add floor on mgmt_register.html
let cur_cnt = 1;
function add_floor(e) {
  e.preventDefault();
  floor_list.innerHTML += `<div class='cur-floor' value='${++cur_cnt}'><div class='room-floor'>${cur_cnt}층</div><div class='room-count'><input class='room-num' name='floor_${cur_cnt}' type='number' min='1' max='99' step='1' value='1'/> 세대</div></div>`;
  floor_count.value = cur_cnt;
}
const floorAddButton = document.querySelector('#add_bt');
floorAddButton.addEventListener('click', add_floor);

// delete floor on mgmt_register.html
function delete_floor(e) {
  e.preventDefault();
  if (cur_cnt > 1) {
    let lastTarget = floor_list.querySelector(`div[value = "${cur_cnt--}"]`);
    floor_list.removeChild(lastTarget);
    floor_count.value = cur_cnt;
  }
}
const floorDeleteButton = document.querySelector('#del_bt');
floorDeleteButton.addEventListener('click', delete_floor);

isNoManager.addEventListener('change', (e) => {
  const mgrId = document.querySelector(`input[name='managerID']`);
  if (e.target.checked) {
    mgrId.value = '건물주 직접 관리';
    mgrId.setAttribute('disabled', 'true');
  } else {
    mgrId.value = '';
    mgrId.removeAttribute('disabled');
  }
});
