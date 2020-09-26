const current_phnum = document.querySelector('#current_phnum');
const change_phnum = document.querySelector('#change_phnum');

change_phnum.addEventListener('click', (e) => {
  e.preventDefault();
  current_phnum.removeAttribute('disabled');
  current_phnum.removeAttribute('value');
});

const show_input = document.querySelector('#show_input');
const change_passwd = document.querySelector('#change_passwd');

show_input.addEventListener('click', (e) => {
  e.preventDefault();
  show_input.style.display = 'none';
  change_passwd.style.display = 'block';
});
