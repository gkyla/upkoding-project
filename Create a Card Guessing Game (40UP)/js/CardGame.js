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
    this.duration = 100;
    this.diff = 'easy';
  }

  diffLevel() {
    // TODO Grab the level from the select option
    // this.level
    const select = document.querySelector('.level');
    select.addEventListener('change', () => {
      this.level = select.selectedOptions[0].value;

      switch (this.level) {
        case 'easy':
          this.duration = 100;
          break;
        case 'medium':
          this.duration = 60;
          break;
        case 'hard':
          this.duration = 40;
          break;
        case 'expert':
          this.duration = 20;
          break;
        default:
          console.error('Oops something went wrong');
      }

      console.log(this.duration);
      console.log(this.level);
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

    this.cards.forEach((el) => {
      cardContainer.innerHTML += `
          <div class="card-game" data-identity="${el.identity}">
             <div class="front"></div>
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

    console.log(dataCorrect, this.total);
    if (dataCorrect.length === this.total) {
      console.log('winner !');
    }
  }

  createHTMLMarkup() {
    this.appContainer.innerHTML = `
      <card-game-board></card-game-board>
      `;

    this.diffLevel();
  }

  activatePairingCardFunctionality() {
    // grab the dom
    const cardsEl = document.querySelectorAll('.card-game');
    const score = document.querySelector('.score');
    let counter = 0;
    let firstIdentity = null;
    let secondIdentity = null;

    cardsEl.forEach((card) => {
      card.addEventListener('click', (e) => {
        const identity = card.dataset.identity;
        e.target.classList.add('choosen');
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
                setTimeout(() => {
                  choosen.setAttribute('data-correct', 'true');
                  choosen.classList.remove('choosen');
                  choosen.classList.add('isMatch');
                }, 1250);
              });
              this.score += 1;
            } else {
              choosenCards.forEach((choosen) => {
                setTimeout(() => choosen.classList.remove('choosen'), 1250);
              });

              if (this.score > 0) {
                this.score -= 1;
              }
            }

            score.innerHTML = `Score : ${this.score}`;
            setTimeout(() => this.checkWinner(), 1250);
            break;
          default:
            console.log('rusak swtich nya');
        }
      });
    });
  }

  init() {
    // Order functions are really important

    this.verifyImg();
    this.createHTMLMarkup(); // boilerplate
    this.createCardIdentity();
    this.randomizeCard();
    this.renderCard();
    this.activatePairingCardFunctionality();
  }
}

export default CardGame;
