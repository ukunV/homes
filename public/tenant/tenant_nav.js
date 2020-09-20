const navHome = document.querySelector('#nav_home');
const navPush = document.querySelector('#nav_push');
const navFunction = document.querySelector('#nav_function');
const navMsg = document.querySelector('nav_msg');

navHome.addEventListener('click', () => (location.href = '/host'));
navPush.addEventListener('click', () => (location.href = '/push'));
navFunction.addEventListener('click', () => (location.href = '/'));
navMsg.addEventListener('click', () => (location.href = '/'));
