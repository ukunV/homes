const sel_all = document.querySelector('#sel_all_radio');

sel_all.addEventListener('click', () => {
  const targets = document.querySelectorAll('input[name="user_id"]');
  if (sel_all.checked == true) {
    targets.forEach((t) => (t.checked = true));
  } else {
    targets.forEach((t) => (t.checked = false));
  }
});
