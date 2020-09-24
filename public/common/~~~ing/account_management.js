const button = document.getElementById('show_form');
const form = document.getElementById('change_passwd_form');

button.addEventListener('click', () => {
  form.style.visibility = 'visible';
});
