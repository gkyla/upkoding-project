'use strict';

class CardGameComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.styling();
  }

  render() {
    this.innerHTML = `
        <div class="start-modal open">
            <div class="modal-content">
              <div class="start-content modal-inner-content open">
                <h1 class="title">Card Guessing Game</h1>
                <select name="level" class="level">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </select>
                <div class="diff-info">
                  <p>Chosen Level : <span class="chosen-level">Easy</span></p>
                  <p>Time to solve : <span class="time-solve">120 Seconds</span></p>
                </div>
                <button class="button" id="start">Start</button>
              </div>
              <div class="lose-content modal-inner-content">
                <h1 class="title">Oh noo 😭</h1>
                <h3 class="title">You lose, here is your status details</h3>

                <div class="score-info"></div>
                <div class="control-user">
                  <button class="button retry" id="retry">Retry</button>
                  <button class="button newGame" id="newGame">New game</button>
                </div>
              </div>
              <div class="winner-content modal-inner-content ">
                <h1 class="title">Congratulation 🎉</h1>
                <h3 class="title">You win the game ! here is your status details</h3>
                <div class="score-info"></div>
                <button class="button newGame">New game</button>
              </div>
            </div>
        </div>
            <div class="wrapper">
                <div class="status">
                    <div class="status-divider">
                      <div class="status-text">Total Card : <span class="point">12</span></div>
                      <div class="status-text">Difficult : <span class="point" id="difficult">-</span></div>
                      <div class="status-text">Card left : <span class="point" id="card-left">12</span></div>
                    </div>
                    <div class="status-divider">
                      <div class="status-text" >Wrong : <span class="point" id="wrong">0</span></div>
                      <div class="status-text">Correct : <span class="point" id="correct">0</span></div>
                    </div>
                </div>

                <div class="control">
                    <div class="control-section">
                    <div class="status-game">
                      <p class="status-text">Score : <span class="score point">0</span></p>
                      <p class="status-text">Duration : <span class="point" id="duration">-</span></p>
                    </div>
                      <div class="control-user">
                        <button class="button retry" id="retry">Retry</button>
                        <button class="button newGame" id="newGame">New game</button>
                      </div>
                    </div>
                </div>
                <div class="card-container"></div>
            </div>
        `;
  }

  styling() {
    this.innerHTML += `
      <style>
        :root {
          --black: #364547;
          --green: #2f5d62;
          --lightBlack: #3a4750;
          --yellow: #ffe268;
          --orange: #ffb037;
          --white: #eeeeee;
        }
        
        card-game-board {
          /* margin: 20px; */
          background: red;
          position: relative;
          transition: 0.3s ease-in-out all;
        }
        
        card-game-board .wrapper {
          position: relative;
          max-width: 1140px;
          margin: 15px;
        }
        
        card-game-board .card-game img {
          max-width: 100%;
          display: inline-block;
        }
        
        card-game-board .card-container {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 120px));
          gap: 20px;
        }
        
        card-game-board .dot {
          width: 20px;
          height: 20px;
          background: var(--red);
          border-radius: 100%;
        }
        
        card-game-board .start-modal {
          display: none;
          background-color: rgba(192, 189, 189, 0.842);
          align-items: center;
          justify-content: center;
          transition: 0.3s ease-in-out all;
        
          z-index: 99;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        
        card-game-board .modal-content {
          padding: 80px 40px;
          background: var(--black);
          border-radius: 7px;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        
        card-game-board .open {
          display: flex !important;
          transition: 0.3s ease-in-out all;
        }
        
        card-game-board .start-content,
        card-game-board .lose-content,
        card-game-board .winner-content {
          min-width: 330px;
          display: none;
          flex-direction: column;
          text-align: center;
        }
        
        card-game-board .title {
          color: white;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        
        card-game-board .card-game {
          position: relative;
          top: 0;
          bottom: 0;
          width: 100%;
          height: 170px;
          transform-style: preserve-3d;
        
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.3s ease-in;
        }
        
        card-game-board .level {
          padding: 0.5rem;
          border-radius: 7px;
          margin-top: 10px;
        }
        
        card-game-board .front,
        card-game-board .back {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          backface-visibility: hidden;
          overflow: hidden;
        }
        
        card-game-board .front {
          border: 3px solid black;
          border-radius: 7px;
          background: var(--black);
          color: white;
          font-size: 24pt;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        card-game-board .num-front {
          border: 3px solid var(--orange);
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          border-radius: 100%;
        }
        
        card-game-board .diff-info {
          color: white;
          margin: 20px 0;
          background: var(--black);
          padding: 10px;
        }
        
        card-game-board .back {
          border-radius: 10px;
          border: 3px solid black;
        
          transform: rotateY(180deg);
          background: #ececec;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px;
        }
        
        card-game-board .card-game > * {
          pointer-events: none;
        }
        
        card-game-board .card-game.choosen {
          pointer-events: none;
          transform: rotateY(180deg);
        }
        
        card-game-board .card-game:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        card-game-board .card-game.isMatch {
          pointer-events: none;
        }
        
        card-game-board .card-game.effect {
          transform: rotateY(180deg);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        card-game-board .control {
          display: flex;
          width: 100%;
          gap: 10px;
        }
        
        card-game-board .control-section {
          color: white;
          font-weight: 500;
          /* background-color: rgb(73, 64, 58); */
          background-color: var(--lightBlack);
          padding: 14px;
          border-radius: 7px;
          flex: 1;
        }
        
        card-game-board .control-user {
          flex: 1;
          display: flex;
          gap: 10px;
        }
        
        /* Status */
        card-game-board .status {
          background: var(--lightBlack);
          border-radius: 7px;
          padding: 15px;
          color: white;
          font-weight: 500;
          margin-bottom: 10px;
          display: flex;
        }
        
        card-game-board .point {
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10px;
        }
        
        card-game-board .status-divider {
          flex: 1;
        }
        
        card-game-board .status-text {
          padding: 5px 7px;
          border-radius: 10px;
          font-size: 1.1em;
          margin: 5px 0;
          display: flex;
          align-items: center;
        }
        
        card-game-board .status-game {
          margin-bottom: 10px;
        }
        
        card-game-board .button {
          width: 100%;
          font-family: inherit;
          padding: 0.7rem 1rem;
          font-weight: 500;
          background: var(--yellow);
          border: none;
          cursor: pointer;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          border-radius: 7px;
          transition: 0.2s ease-in-out;
        }
        
        card-game-board .button:hover {
          background: var(--yellow);
          opacity: 0.8;
        }
        
        card-game-board .control > * {
          margin: 5px 0;
        }
        
        card-game-board .control {
          margin-bottom: 20px;
        }
        
        card-game-board .score-info {
          color: white;
          padding: 10px;
          background: #222831;
          border-radius: 7px;
          margin: 10px 0;
        }
        
        @media (min-width: 650px) {
          card-game-board .card-container {
            grid-template-columns: repeat(4, minmax(0, 170px));
          }
        
          card-game-board .card-game {
            height: 250px;
          }
        
          card-game-board .back {
            padding: 45px;
          }
        }
      </style>
    `;
  }
}

customElements.define('card-game-board', CardGameComponent);

export default CardGameComponent;
