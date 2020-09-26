const navHome = document.querySelector('#nav_home');
const navPush = document.querySelector('#nav_push');
const navFunction = document.querySelector('#nav_function');
const navManagement = document.querySelector('#nav_management');

navHome.addEventListener('click', () => (location.href = '/'));
navPush.addEventListener('click', () => (location.href = '/push'));
navFunction.addEventListener('click', () => (location.href = '/function'));
navManagement.addEventListener('click', () => (location.href = '/host/management'));
