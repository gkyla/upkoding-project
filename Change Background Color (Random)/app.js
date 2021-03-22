const body = document.body;
const btn = document.querySelector('.btn');
const whatRgb = document.querySelector('.what-rgb');

function generateRandomVal(max) {
  return Math.round(Math.random() * Math.ceil(max));
}

function changeBackground() {
  // Rgb max val = 255
  const r = generateRandomVal(255);
  const g = generateRandomVal(255);
  const b = generateRandomVal(255);

  body.style.backgroundColor = `rgb(${r},${g},${b})`;
  renderDom(r, g, b);
}

function renderDom(r, g, b) {
  whatRgb.innerText = `rgb (${r},${g},${b})`;
}

btn.addEventListener('click', function () {
  changeBackground();
});

// Generate the background
changeBackground();
