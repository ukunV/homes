const setapp = document.querySelector('.navbar-setapp');
const menu = document.querySelector('.set-menu');

setapp.addEventListener('click', () => menu.classList.toggle('active'));

document.querySelector('.set-account').addEventListener('click', () => {
	location.href = '/check/password';
});
document.querySelector('.set-logout').addEventListener('click', () => {
	location.href = '/process/logout';
});
