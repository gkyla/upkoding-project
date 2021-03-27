const form = document.querySelector('form');
const display = document.querySelector('.display');
const heightError = document.querySelector('.height-error');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const mode = this.mode.value;
  const height = this.height.value;
  const weight = this.weight;

  performIdealCalc(mode, height, weight);
});

function performIdealCalc(mode, height, weight) {
  /* 
    If mode(gender) or height is empty also if height is under 100
    then stop the function
 */

  if (mode == null || mode == undefined || mode == '') return;
  if (+height < 100 || height.trim() === '') {
    return;
  }

  let countedWeightValue = null;

  switch (mode) {
    case 'female':
      countedWeightValue = +height - 100 - (+height - 100) * 0.15;
      break;
    case 'male':
      countedWeightValue = +height - 100 - (+height - 100) * 0.1;
      break;
  }

  weight.value = `Your Ideal weight is ${countedWeightValue}`;
}
