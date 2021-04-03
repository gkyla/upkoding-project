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
    this.diff = 'Easy';
  }

  // Get user status
  get userState() {
    return {
      score: this.score,
      duration: this.duration,
      diff: this.diff,
      wrong: this.wrong,
      correct: this.correct,
    };
  }

  activateDiffLevel() {
    const select = document.querySelector('.level');
    select.addEventListener('change', () => {
      this.level = select.selectedOptions[0].value;

      switch (this.level) {
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

      const choosenLevel = document.querySelector('.choosen-level');
      const timeSolve = document.querySelector('.time-solve');
      choosenLevel.textContent = this.level;
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
    console.log(this.cards);
  }

  createCardIdentity() {
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
      console.log('winner !');
      // return true;
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
    // grab the dom
    const cardsEl = document.querySelectorAll('.card-game');
    // const score = document.querySelector('.score');
    let counter = 0;
    let firstIdentity = null;
    let secondIdentity = null;

    cardsEl.forEach((card) => {
      card.addEventListener('click', (e) => {
        const identity = card.dataset.identity;
        e.target.classList.add('choosen', 'effect');
        const choosenCards = document.querySelectorAll('.choosen');

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
              choosenCards.forEach((choosen) => {
                choosen.classList.remove('choosen');
                choosen.classList.add('isMatch');
                choosen.setAttribute('data-correct', 'true');
              });
              this.score += 1;
              this.correct += 1;
            } else {
              this.wrong += 1;
              choosenCards.forEach((choosen) => {
                choosen.classList.remove('choosen');

                // Remove flip effect
                setTimeout(() => {
                  choosen.classList.remove('effect');
                }, 700);
              });
              if (this.score > 0) {
                this.score -= 1;
              }
            }

            // score.innerHTML = this.score;
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
    const durationEl = document.querySelector('#duration');
    durationEl.textContent = this.duration;

    this.interval = setInterval(() => {
      this.duration -= 1;
      durationEl.textContent = this.duration;

      if (this.duration === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  updateUserState() {
    // Grab els
    const score = document.querySelector('.score');
    const wrong = document.querySelector('#wrong');
    const correct = document.querySelector('#correct');

    score.textContent = this.score;
    wrong.textContent = this.wrong;
    correct.textContent = this.correct;
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

    // Handle Option
    const start = document.querySelector('#start');
    const modal = document.querySelector('.start-modal');

    start.addEventListener('click', () => {
      modal.classList.remove('open');
      this.timingUpdate();
    });
  }
}

export default CardGame;
