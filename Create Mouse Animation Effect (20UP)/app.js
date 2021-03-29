const cursorStyle = document.querySelector('.cursor-style');
let timer;

function randomizeBackground() {
  return Math.round(Math.random() * Math.ceil(255));
}

window.addEventListener('mousemove', (e) => {
  // When mouse is moving clear the timeout
  clearTimeout(timer);

  // For backgrond color
  const r = randomizeBackground();
  const g = randomizeBackground();
  const b = randomizeBackground();

  timer = setTimeout(() => {
    cursorStyle.style.backgroundColor = `rgb(${r},${g},${b})`;
    cursorStyle.style.border = `3px solid rgb(${randomizeBackground()},${randomizeBackground()},${randomizeBackground()})`;
  }, 100);

  cursorStyle.style.top = `${e.clientY}px`;
  cursorStyle.style.left = `${e.clientX}px`;
});
