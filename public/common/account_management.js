const modifyBts = document.querySelectorAll('.view-submit');

const viewSubmit = (e) => {
  e.preventDefault();
  const modify_target = e.target.getAttribute('mod');
  const viewSubmitTarget = document.querySelector(`button[mod-target='${modify_target}']`);
  const inputTarget = document.querySelector(`input[name='${modify_target}']`);
  if (viewSubmitTarget.style.display === 'none' || viewSubmitTarget.style.display === '') {
    viewSubmitTarget.style.display = 'block';
    e.target.classList.add('cancel');
    e.target.innerHTML = '취소';
    inputTarget.removeAttribute('disabled');
  } else {
    viewSubmitTarget.style.display = 'none';
    e.target.classList.remove('cancel');
    e.target.innerHTML = '수정';
    inputTarget.setAttribute('disabled');
  }
};

modifyBts.forEach((bt) => bt.addEventListener('click', viewSubmit));
