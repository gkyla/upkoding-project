class CardGameComponent extends HTMLElement {
  // Todo add flip effect
  connectedCallback() {
    this.render();
    this.styling();
  }

  render() {
    this.innerHTML = `
        <div class="start-modal open">
            <div class="modal-content">
              <div class="start-content open">
                <h1 class="title">Card Guessing Game</h1>
                <select name="level" class="level">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </select>
                <div class="diff-info">
                  <p>Level Choosen : <span class="choosen-level">Easy</span></p>
                  <p>Time to solve : <span class="time-solve">120 Seconds</span></p>
                </div>
                <button class="button" id="start">Start</button>
              </div>
              <div class="lose-content">
                asldjasd
              </div>
              <div class="winner-content">
                <h1 class="title">Congratulation</h1>
                <h3 class="title">You win the game ! , here is your status</h3>
                <div class="score-info">
               
                </div>
                <button class="button">New game</button>
              </div>
            </div>
        </div>
            <div class="wrapper">
                <div class="status">
                  <div class="status-text">Total Card : 12</div>
                  <div class="status-text">Level : <span id="level">-</span></div>
                  <div class="status-text">Card left : <span id="card-left">12</span></div>
                  <div class="status-text" >Wrong : <span id="wrong">0</span></div>
                  <div class="status-text">Correct : <span id="correct">0</span></div>
                </div>

                <div class="control">
                    <div class="control-section">
                    <div class="status-game">
                      <p class="status-text">Score : <span class="score">0</span></p>
                      <p class="status-text">Duration : <span id="duration"></span></p>
                    </div>
                      <div class="control-user">
                        <button class="button retry">Retry</button>
                        <button class="button newGame">new game</button>
                      </div>
                    </div>
                </div>
                <div class="card-container"></div>
            </div>
        `;
  }

  styling() {
    this.innerHTML += `
   
    `;
  }
}

customElements.define('card-game-board', CardGameComponent);

export default CardGameComponent;
