const buildingButtons = document.querySelectorAll(`input[name='buildings']`);

buildingButtons.forEach((bt) => bt.addEventListener('change', toggleReceivers));

function toggleReceivers(e) {
  const buildNum = e.target.getAttribute('build-num');
  const targets_label = document.querySelectorAll(`label[build-num='${buildNum}']`);
  const targets_inner_label = document.querySelectorAll(
    `label[build-num='${buildNum}'] input[name='user_id']`,
  );
  if (e.target.checked) {
    targets_label.forEach((label) => (label.style.display = 'block'));
    targets_inner_label.forEach((innerInputBox) => (innerInputBox.checked = false));
  } else {
    targets_label.forEach((label) => (label.style.display = 'none'));
    targets_inner_label.forEach((innerInputBox) => (innerInputBox.checked = false));
  }
}

function loadOffToggle() {
  const targets_label = document.querySelectorAll(`label.receiver-label`);
  const targets_inner_label = document.querySelectorAll(
    `label.receiver-label input[name='user_id']`,
  );
  targets_label.forEach((label) => (label.style.display = 'none'));
  targets_inner_label.forEach((innerInputBox) => (innerInputBox.checked = false));
}

window.addEventListener('load', loadOffToggle);

const sel_all = document.querySelector('#sel_all_radio');

sel_all.addEventListener('click', () => {
  const targets = document.querySelectorAll('input[name="user_id"]');
  if (sel_all.checked == true) {
    targets.forEach((t) => (t.checked = true));
  } else {
    targets.forEach((t) => (t.checked = false));
  }
});
