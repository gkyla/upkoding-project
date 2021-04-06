'use strict';

import CardGame from './CardGame.js'; // Importing CardGame class
import './components/CardGameBoard.js'; // Importing CardGameBoard Component

// Basic Setup !
// Container Parent for card game board initialization
const appContainer = document.querySelector('#app');

/*
  Path to img / link img  
  in this case we are using local img from "img" folder
*/
const imageOption = {
  img1: './img/1.png', // Can also use online photo from the internet ! (any link)
  img2: './img/2.png',
  img3: './img/3.png',
};

(function () {
  try {
    const cardGame = new CardGame(appContainer, {
      imgPath: imageOption,
    });

    // Render the CardGame to the #app(appContainer).
    cardGame.init();

    // Getting user information
    console.log(cardGame.userState);
  } catch (error) {
    console.error(error);
  }
})();
