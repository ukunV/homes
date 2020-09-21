const sel_all = document.querySelector('#sel_all_radio');
const receiver_list = document.querySelectorAll('.receiver-radio');

sel_all.addEventListener('click', () => {
  if (sel_all.checked == true) {
    for (let i = 0; i < receiver_list.length; i++) {
      receiver_list[i].checked = true;
    }
  } else {
    for (let i = 0; i < receiver_list.length; i++) {
      receiver_list[i].checked = false;
    }
  }
});
