class CardGame {
  constructor(container, { imgPath }) {
    this.container = container;
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
    this.cards.forEach((el) => {
      this.container.innerHTML += `
        <div class="card-game" data-identity="${el.identity}">
            <img src="${el.src}" alt="${el.identity}" />
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

  activatePairingCardFunctionality() {
    // grab the dom
    const cardsEl = document.querySelectorAll('.card-game');

    cardsEl.forEach((el) => {
      el.addEventListener('click', (e) => {
        const identity = el.dataset.identity;
        console.log(identity);
      });
    });
  }

  start() {
    this.verifyImg();
    this.createCardIdentity();
    this.randomizeCard();
    this.renderCard();
    this.activatePairingCardFunctionality();
  }
}

const cardContainer = document.querySelector('.card-container');
try {
  const cardGame = new CardGame(cardContainer, {
    imgPath: {
      img1: './img/1.png',
      img2: './img/2.png',
      img3: './img/3.png',
    },
  });
  cardGame.start();
} catch (error) {
  console.error(error);
}
