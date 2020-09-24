const viewAllBt = document.querySelector('#view_all_bt');
const viewNotSolvedBt = document.querySelector('#view_not_solved_bt');
const viewSolvedBt = document.querySelector('#view_solved_bt');

const allButtons = [viewAllBt, viewNotSolvedBt, viewSolvedBt];

const listNotSolved = document.querySelector('#not-solved-list');
const listSolved = document.querySelector('#solved-list');

viewAllBt.addEventListener('click', () => {
  deleteClassFilterSelected();
  if (listNotSolved) listNotSolved.style.display = 'block';
  if (listSolved) listSolved.style.display = 'block';
  viewAllBt.classList.add('filter-selected');
});

viewNotSolvedBt.addEventListener('click', () => {
  deleteClassFilterSelected();
  if (listNotSolved) listNotSolved.style.display = 'block';
  if (listSolved) listSolved.style.display = 'none';
  viewNotSolvedBt.classList.add('filter-selected');
});

viewSolvedBt.addEventListener('click', () => {
  deleteClassFilterSelected();
  if (listNotSolved) listNotSolved.style.display = 'none';
  if (listSolved) listSolved.style.display = 'block';
  viewSolvedBt.classList.add('filter-selected');
});

function deleteClassFilterSelected() {
  allButtons.forEach((bt) => bt.classList.remove('filter-selected'));
}
