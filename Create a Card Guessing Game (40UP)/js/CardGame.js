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

    console.log(dataCorrect);
    if (dataCorrect.length === this.total) {
      console.log('winner !');
    }
  }

  populateHTML() {
    this.appContainer.innerHTML = `
      <card-game-board></card-game-board>
      `;
  }

  activatePairingCardFunctionality() {
    // grab the dom
    const cardsEl = document.querySelectorAll('.card-game');
    const score = document.querySelector('.score');
    let counter = 0;
    let firstIdentity = null;
    let secondIdentity = null;

    cardsEl.forEach((el) => {
      el.addEventListener('click', (e) => {
        const identity = el.dataset.identity;
        e.target.classList.add('choosen');
        counter += 1;
        const theCorrectChoosen = document.querySelectorAll('.choosen');

        // Todo if total of data-correct element is equals to this.total
        // then we can conclude we already finished the game a.k.a win

        switch (counter) {
          case 1:
            firstIdentity = identity;
            break;
          case 2:
            secondIdentity = identity;
            // Reset Counter
            counter = 0;

            if (firstIdentity === secondIdentity) {
              theCorrectChoosen.forEach((el) => {
                el.setAttribute('data-correct', 'true');
                el.classList.remove('choosen');
                el.style.visibility = 'hidden';
              });
              this.score += 1;
              this.checkWinner();
            } else {
              theCorrectChoosen.forEach((el) => {
                el.classList.remove('choosen');
              });
              this.score -= 1;
            }

            score.innerHTML = `score : ${this.score}`;
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
    this.populateHTML(); // Container boilerplate
    this.createCardIdentity();
    this.randomizeCard();
    this.renderCard();
    this.activatePairingCardFunctionality();
  }
}

export default CardGame;
