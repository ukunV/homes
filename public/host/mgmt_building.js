const setButtons = document.querySelectorAll('.content-right');

setButtons.forEach((bt) => {
  bt.addEventListener('click', openSetting);
});

function openSetting(e) {
  const buildingId = e.target.getAttribute('value');
  const targetOpen = document.querySelector(`.content-building[value="${buildingId}"]`)
    .parentElement;
  targetOpen.innerHTML += '123';
}
