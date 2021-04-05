'use strict';

class CardGame {
  constructor(appContainer, { imgPath }) {
    this.appContainer = appContainer;
    this.img = imgPath;

    // Initial value
    this.total = 12;
    this.variant = 3;
    this.score = 0;
    this.eachPicture = this.total / this.variant;
    this.cards = [];
    this.wrong = 0;
    this.correct = 0;
    this.duration = 120;
    this.cardLeft = null;
    this.timeLeft = null;
    this.diff = 'Easy';
  }

  // Get user status
  get userState() {
    return {
      Diff: this.diff,
      Score: this.score,
      ['Time Left']: this.timeLeft,
      Wrong: this.wrong,
      Correct: this.correct,
    };
  }

  activateDiffLevel() {
    const select = document.querySelector('.level');
    select.addEventListener('change', () => {
      this.diff = select.selectedOptions[0].value;

      switch (this.diff) {
        case 'Easy':
          this.duration = 120;
          break;
        case 'Medium':
          this.duration = 80;
          break;
        case 'Hard':
          this.duration = 60;
          break;
        case 'Expert':
          this.duration = 30;
          break;
        default:
          console.error('Oops something went wrong');
      }

      const chosenLevel = document.querySelector('.chosen-level');
      const timeSolve = document.querySelector('.time-solve');
      const difficult = document.querySelector('#difficult');

      chosenLevel.textContent = this.diff;
      difficult.textContent = this.diff;
      timeSolve.textContent = this.duration;
    });
  }

  verifyImg() {
    let keys = Object.keys(this.img);

    if (keys.length < 3) {
      throw new Error(
        'You need to configure the 3 images by passing key path to the imgPath object'
      );
    } else if (keys.length > 3) {
      // Explicit conditional
      throw new Error('Maximum images are 3');
    }
    keys.forEach((key, index) => {
      if (key !== `img${index + 1}`) {
        throw new Error('Invalid key naming order, must be img1, img2, img3');
      }
    });
  }

  renderCard() {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';

    this.cards.forEach((el, index) => {
      cardContainer.innerHTML += `
          <div class="card-game" data-identity="${el.identity}">
             <div class="front">
              <div class="num-front">${index + 1}</div>
             </div>
             <div class="back">
                <img src="${el.src}" alt="${el.identity}" />
             </div>
          </div>
          `;
    });
  }

  randomizeCard() {
    /* Shuffle the array with Fisher Yates algorithm
      https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle */
    let lastIndex = this.cards.length - 1;

    while (lastIndex > 0) {
      let random = Math.floor(Math.random() * lastIndex);

      let temp = this.cards[random];
      this.cards[random] = this.cards[lastIndex];
      this.cards[lastIndex] = temp;
      lastIndex -= 1;
    }
  }

  createCardIdentity() {
    this.cards = [];

    for (let prop in this.img) {
      for (let i = 1; i <= this.eachPicture; i++) {
        this.cards.push({ src: this.img[prop], identity: prop });
      }
    }
  }

  checkWinner() {
    const dataCorrect = document.querySelectorAll('[data-correct="true"]');
    const modal = document.querySelector('.start-modal');
    const startModal = document.querySelector('.start-content');
    const loseModal = document.querySelector('.lose-content');
    const winnerModal = document.querySelector('.winner-content');

    if (dataCorrect.length === this.total) {
      clearInterval(this.interval);
      modal.classList.add('open');
      startModal.classList.remove('open');
      winnerModal.classList.add('open');
      const scoreInfo = document.querySelector('.score-info');

      for (let prop in this.userState) {
        scoreInfo.innerHTML += `<p>${prop} : ${this.userState[prop]}</p>`;
      }
    }
  }

  createHTMLMarkup() {
    // From CardGameBoard Component
    this.appContainer.innerHTML = `
      <card-game-board></card-game-board>
      `;
  }

  activatePairingCardFunctionality() {
    const cardsEl = document.querySelectorAll('.card-game');

    let counter = 0;
    let firstIdentity = null;
    let secondIdentity = null;

    cardsEl.forEach((card) => {
      card.addEventListener('click', (e) => {
        const identity = card.dataset.identity;
        e.target.classList.add('chosen', 'effect');
        const chosenCards = document.querySelectorAll('.chosen');

        counter += 1;

        switch (counter) {
          case 1:
            firstIdentity = identity;
            break;
          case 2:
            secondIdentity = identity;

            // Reset Counter
            counter = 0;

            if (firstIdentity === secondIdentity) {
              this.score += 1;
              this.correct += 1;

              chosenCards.forEach((chosen) => {
                chosen.classList.remove('chosen');
                chosen.classList.add('isMatch');
                chosen.setAttribute('data-correct', 'true');
              });
            } else {
              this.wrong += 1;

              if (this.score > 0) {
                this.score -= 1;
              }

              chosenCards.forEach((chosen) => {
                chosen.classList.remove('chosen');

                // Remove flip effect
                setTimeout(() => {
                  chosen.classList.remove('effect');
                }, 700);
              });
            }

            this.updateUserState();
            this.checkWinner();

            break;
          default:
            console.error('Oops something went wrong');
        }
      });
    });
  }

  timingUpdate() {
    /* 
      Calling timingUpdate function will reset this.timeLeft value 
    */

    const durationEl = document.querySelector('#duration');
    this.timeLeft = this.duration;
    durationEl.textContent = this.duration;

    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.timeLeft -= 1;
      durationEl.textContent = this.timeLeft;

      if (this.timeLeft === 0) {
        clearInterval(this.interval);
        this.lose();
      }
    }, 1000);
  }

  lose() {
    // const startModal = document.querySelector('.start-modal');
    const loseContent = document.querySelector('.lose-content');
    const startModal = document.querySelector('.start-modal');
    // const winnerModal = document.querySelector('.winner-content');
    const modalInnerContent = document.querySelectorAll('.modal-inner-content');
    modalInnerContent.forEach((modalContent) => {
      if (modalContent.classList.contains('open')) {
        modalContent.classList.remove('open');
      }
    });
    startModal.classList.add('open');
    loseContent.classList.add('open');
  }

  updateUserState() {
    // Grab elements
    const score = document.querySelector('.score');
    const wrong = document.querySelector('#wrong');
    const correct = document.querySelector('#correct');
    const cardLeft = document.querySelector('#card-left');
    const isMatch = document.querySelectorAll('.isMatch');

    this.cardLeft = this.cards.length - isMatch.length;
    score.textContent = this.score;
    wrong.textContent = this.wrong;
    correct.textContent = this.correct;
    cardLeft.textContent = this.cardLeft;
  }

  retry() {
    /* 
      1. Reset State
      2. Rerender all of the card with cards data from this.cards
      3. Re bind click listener with the new rendered cards element
      4. reset Timing to default (with the chosen diff)
    */

    this.resetState();
    this.renderCard();
    this.activatePairingCardFunctionality();
    this.timingUpdate();
  }

  newGame() {
    /* 
      1. Reinitialize init() method
      2. Reset state
    */

    this.init();
    this.resetState();
  }

  resetState() {
    // Reset value

    this.score = 0;
    this.wrong = 0;
    this.correct = 0;
    this.updateUserState();
  }

  init() {
    // Order functions are really important

    this.verifyImg();
    this.createHTMLMarkup(); // boilerplate
    this.activateDiffLevel();
    this.createCardIdentity();
    this.randomizeCard();
    this.renderCard();
    this.activatePairingCardFunctionality();

    // Handle Options
    const start = document.querySelector('#start');
    const modal = document.querySelector('.start-modal');
    const retry = document.getElementById('retry');
    const newGame = document.querySelectorAll('.newGame');

    start.addEventListener('click', () => {
      modal.classList.remove('open');
      this.timingUpdate();
    });

    retry.addEventListener('click', () => {
      this.retry();
    });

    newGame.forEach((element) => {
      element.addEventListener('click', () => {
        this.newGame();
      });
    });
  }
}

export default CardGame;
