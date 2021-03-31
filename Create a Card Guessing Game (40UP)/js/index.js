import CardGame from './CardGame.js';
import './components/CardGameBoard.js';

// Setup

// Container Parent for the card game board initialization
const appContainer = document.querySelector('#app');

const imageOption = {
  img1: './img/1.png', // Can also use online photo (any link)
  img2: './img/2.png',
  img3: './img/3.png',
};

try {
  const cardGame = new CardGame(appContainer, {
    imgPath: imageOption,
  });

  // Render the Card Game to the #app(appContainer).
  cardGame.init();
} catch (error) {
  console.error(error);
}
