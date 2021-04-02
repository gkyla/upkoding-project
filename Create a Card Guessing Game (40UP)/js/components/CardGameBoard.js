class CardGameComponent extends HTMLElement {
  // Todo add flip effect
  connectedCallback() {
    this.render();
    this.styling();
  }

  styling() {
    this.innerHTML += `
   
    `;
  }

  render() {
    this.innerHTML = `
        <div class="start-modal">
            <div class="modal-content">
                    <h1 class="title">Card Guessing Game</h1>
                 <button id="start">Start</button>

            </div>
        </div>
            <div class="wrapper">
                <div class="control">
                    <div class="score">Score : 0</div>
                </div>
                <div class="card-container"></div>
            </div>
        `;
  }
}

customElements.define('card-game-board', CardGameComponent);

export default CardGameComponent;
