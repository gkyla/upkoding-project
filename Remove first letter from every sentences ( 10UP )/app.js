const form = document.querySelector('.form');
const resultBox = document.querySelector('#result');

function removeFirstLetter(sentences) {
   const splittedSentences = sentences.split(' ');
   return splittedSentences.map((str) => str.substring(1)).join(' ');
}

form.addEventListener('submit', (e) => {
   e.preventDefault();

   const result = removeFirstLetter(form.sentences.value);
   resultBox.innerText = result;
});
