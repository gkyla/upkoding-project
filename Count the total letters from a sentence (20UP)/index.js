const form = document.querySelector('form');
const box = document.querySelector('.box');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const sentence = this.sentence.value;

  performCounting(sentence);
});

function performCounting(sentence) {
  if (sentence.trim() === '' || !isNaN(sentence)) return;

  const reg = /[A-Za-z]/gi;
  const uniqueWord = new Set(sentence);
  const result = sentence.match(reg);
  const resultObj = {};

  [...uniqueWord].forEach((unique) => {
    result.forEach((word) => {
      if (word === unique) {
        if (!resultObj[unique]) {
          resultObj[unique] = 1;
        } else {
          resultObj[unique] += 1;
        }
      }
    });
  });

  console.log(
    `=========================================
      
The sentence that you input is : ${sentence}

=========================================
      `
  );

  // the result
  for (let prop in resultObj) {
    console.log(
      `On word ${prop}, there ${resultObj[prop] > 1 ? 'are' : 'is'} ${
        resultObj[prop]
      } character${resultObj[prop] > 1 ? 's' : ''}`
    );
  }
  box.innerHTML = 'Check your detail on the console browser ✨';
}
