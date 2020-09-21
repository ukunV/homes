const navHome = document.querySelector('#nav_home');
const navPush = document.querySelector('#nav_push');
const navFunction = document.querySelector('#nav_function');
const navManagement = document.querySelector('#nav_management');
const navRegister = document.querySelector('#mgmt_register_bt');
const navMsg = document.querySelector('.content-right');
const navAden = document.querySelector('.content-left');

navHome.addEventListener('click', () => (location.href = '/host'));
navPush.addEventListener('click', () => (location.href = '/push'));
navFunction.addEventListener('click', () => (location.href = '/function'));
navManagement.addEventListener('click', () => (location.href = '/host/management'));

if (navRegister) {
  navRegister.addEventListener('click', () => (location.href = '/host/mgmt_register'));
}

if (navMsg) {
  navMsg.addEventListener('click', () => (location.href = '/'));
}

if (navAden) {
  navAden.addEventListener('click', () => (location.href = '/host/host_aden'));
}
