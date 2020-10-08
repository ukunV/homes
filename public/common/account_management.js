const modifyBts = document.querySelectorAll('.view-submit');
const pwAgainWrapper = document.querySelector('.password-again-wrapper');
const passwordInput = document.querySelector('#password_text');
const passwordAgainInput = document.querySelector('#password_again');
const pwMsg = document.querySelector('#password_msg');
const pwForm = document.querySelector('#password_form');
const pwSubmitBt = document.querySelector('button[mod-target="password"]');

const viewSubmit = (e) => {
  e.preventDefault();
  const modify_target = e.target.getAttribute('mod');
  const viewSubmitTarget = document.querySelector(`button[mod-target='${modify_target}']`);
  const inputTarget = document.querySelector(`input[name='${modify_target}']`);
  if (viewSubmitTarget.style.display === 'none' || viewSubmitTarget.style.display === '') {
    viewSubmitTarget.style.display = 'block';
    e.target.classList.add('cancel');
    e.target.innerHTML = '취소';
    inputTarget.disabled = false;
    if (modify_target === 'password') {
      pwAgainWrapper.style.display = 'flex';
    }
  } else {
    viewSubmitTarget.style.display = 'none';
    e.target.classList.remove('cancel');
    e.target.innerHTML = '수정';
    inputTarget.disabled = true;
    if (modify_target === 'password') {
      pwAgainWrapper.style.display = 'none';
    }
  }
};

function checkPassword() {
  const pwValue = passwordInput.value;
  const pwAgainValue = passwordAgainInput.value;

  if (pwValue.length < 6) {
    pwMsg.textContent = '6자 이상 입력';
    pwSubmitBt.disabled = true;
    return;
  }

  if (pwValue != pwAgainValue) {
    pwMsg.textContent = '비밀번호 불일치';
    pwSubmitBt.disabled = true;
    return;
  }

  pwMsg.textContent = '';
  pwSubmitBt.disabled = false;
}

passwordInput.addEventListener('keyup', checkPassword);
passwordAgainInput.addEventListener('keyup', checkPassword);

checkPassword();

modifyBts.forEach((bt) => bt.addEventListener('click', viewSubmit));
