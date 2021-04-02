class CardGameComponent extends HTMLElement {
  // Todo add flip effect
  connectedCallback() {
    this.render();
    this.styling();

    const start = document.querySelector('#start');

    start.addEventListener('click', function () {
      const modal = document.querySelector('.start-modal');

      modal.classList.remove('open');
    });
  }

  styling() {
    this.innerHTML += `
   
    `;
  }

  render() {
    this.innerHTML = `
        <div class="start-modal open">
            <div class="modal-content">
                <h1 class="title">Card Guessing Game</h1>
                <select name="level" class="level">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="expert">Expert</option>
                </select>
                <button class="button" id="start">Start</button>
            </div>
        </div>
            <div class="wrapper">
                <div class="status">
                  <div class="status-text">Total Card : 12</div>
                  <div class="status-text" id="level">Level : -</div>
                  <div class="status-text" id="card-left">Card left : 12</div>
                  <div class="status-text" id="wrong">Wrong : 0</div>
                  <div class="status-text" id="correct">Correct : 0</div>
                </div>
                <div class="control">
                    <div class="score">
                    Score : 0
                    <span class="status-text" id="duration">Duration : 100</span>
                    </div>
                    
                    <button class="button retry">Retry</button>
                    <button class="button newGame">new game</button>
                </div>
                <div class="card-container"></div>
            </div>
        `;
  }
}

customElements.define('card-game-board', CardGameComponent);

export default CardGameComponent;
