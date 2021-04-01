class CardGameComponent extends HTMLElement {
  // Todo add flip effect
  connectedCallback() {
    this.innerHTML = `
        <style>
            card-game-board{
                margin: 40px;
            }

            .card-game img {
                max-width: 100%;
                display: inline-block;
            }
            
            .card-container {
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 150px));
                gap: 20px;
            }
            
            .card-game {
                position:relative;
                top:0;
                bottom:0;
                width: 150px;
                height: 250px;
                transform-style : preserve-3d;

                cursor: pointer;
                border: 3px solid black;
                border-radius: 10px;
                transition: all 0.3s ease-in;
            } 

            .card-game:hover{
                transform : rotateY(180deg)
            }

            .front{
                position: absolute;
                top: 0;
                right:0;
                left: 0;
                bottom:0;

                border-radius: 4.5px;
                backface-visibility: hidden;
                background: #222831;
                overflow : hidden;
            }

            .back{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 10px;
                backface-visibility: hidden;
                overflow: hidden;
                transform : rotateY(180deg);
                background:#ececec;
                display: flex;
                justify-content: center;
                align-items:center;
                padding: 35px;
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
