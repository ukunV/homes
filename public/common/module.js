const setapp = document.querySelector('.navbar-setapp');
const menu = document.querySelector('.set-menu');
const setAccount = document.querySelector('.set-account');

if (setapp) {
  setapp.addEventListener('click', () => menu.classList.toggle('active'));
}

if (setAccount) {
  setAccount.addEventListener('click', () => {
    location.href = '/check/password';
  });
  document.querySelector('.set-logout').addEventListener('click', () => {
    location.href = '/process/logout';
  });
}
