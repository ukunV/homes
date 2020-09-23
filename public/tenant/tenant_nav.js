const navHome = document.querySelector('#nav_home');
const navPush = document.querySelector('#nav_push');
const navFunction = document.querySelector('#nav_function');

navHome.addEventListener('click', () => (location.href = '/tenant'));
navPush.addEventListener('click', () => (location.href = ''));
navFunction.addEventListener('click', () => (location.href = '/tenant/function'));
