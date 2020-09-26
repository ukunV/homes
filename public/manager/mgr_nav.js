const navHome = document.querySelector('#nav_home');
const navPush = document.querySelector('#nav_push');
const navFunction = document.querySelector('#nav_function');

navHome.addEventListener('click', () => (location.href = '/manager'));
navPush.addEventListener('click', () => (location.href = '/push'));
navFunction.addEventListener('click', () => (location.href = '/function'));
