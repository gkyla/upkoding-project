const form = document.querySelector('form');
const box = document.querySelector('.box');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputVal = form.input.value;
  renderPyramid(inputVal);
});

function renderPyramid(n) {
  // If n is not number or less than 1 then stop the function
  if (isNaN(n)) return;
  if (n < 1) return;

  let template = '';

  for (let rows = 1; rows <= n; rows += 1) {
    for (let spacing = 1; spacing <= n - rows; spacing += 1) {
      template += '&nbsp';
    }
    for (let star = 1; star <= rows; star += 1) {
      template += '* ';
    }
    template += '<br/>';
  }

  box.innerHTML = template;
}
