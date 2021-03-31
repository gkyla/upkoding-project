class CardGameComponent extends HTMLElement {
  // Todo add flip effect
  connectedCallback() {
    this.innerHTML = `
        <style>
            img {
            max-width: 100%;
            }
            
            .card-container {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 150px));
            gap: 20px;
            }
            
            .card-game {
            cursor: pointer;
            border: 2px solid black;
            padding: 20px;
            border-radius: 20px;
            } 

            .card-game > * {
                pointer-events: none;
            }

            .card-game.choosen{
                pointer-events: none;
            }
        </style>
        

        <div class="wrapper">
            <div class="score">Score : 0</div>
            <div class="card-container"></div>
        </div>
    `;
  }
}

customElements.define('card-game-board', CardGameComponent);

export default CardGameComponent;
